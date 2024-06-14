import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "SignIn",
      credentials: {
        email: { label: "email", type: "email", placeholder: "user@email.com" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        const result = await fetch(`${process.env.BASE_URL}/auth/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
        });
        const data = await result.json();
        const user = data?.user;

        if (!user) {
          throw new Error("로그인 실패: 계정 정보를 다시 확인해주세요.");
        }

        return {
          ...user,
          accessToken: data.accessToken,
        };
      },
    }),
    Credentials({
      id: "signup",
      name: "signup",
      credentials: {
        email: { label: "email", type: "email", placeholder: "user@email.com" },
        nickname: { label: "nickname", type: "text", placeholder: "nickname" },
        password: { label: "password", type: "password", placeholder: "password" },
        passwordConfirmation: { label: "passwordConfirmation", type: "password", placeholder: "password confirmation" },
      },
      async authorize(credentials) {
        try {
          const result = await fetch(`${process.env.BASE_URL}/auth/signUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              nickname: credentials?.nickname,
              password: credentials?.password,
              passwordConfirmation: credentials?.passwordConfirmation,
            }),
          });
          const data = await result.json();
          const user = data?.user;

          if (result.ok && user) {
            return {
              ...user,
              accessToken: data.accessToken,
            };
          }
          return await Promise.reject(data);
        } catch (error) {
          const typedError = error as { message: string; details: { [key: string]: { message: string } } };
          throw new Error(typedError?.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.accessToken = user?.accessToken;
        // eslint-disable-next-line no-param-reassign
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.accessToken = token.accessToken as string;
      // eslint-disable-next-line no-param-reassign
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  secret: process.env.SECRET,
};

export default authOptions;
