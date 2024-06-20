import { cookies } from "next/headers";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      // 카카오 로그인
      name: "kakao",
      id: "kakao",
      credentials: {
        code: { type: "text", label: "토큰" },
      },
      async authorize(credentials) {
        try {
          const result = await fetch(`${process.env.BASE_URL}/auth/signIn/kakao`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              redirectUri: `${process.env.NEXTAUTH_URL}/signin`,
              token: credentials?.code,
            }),
          });

          const data = await result.json();
          const user = data?.user;

          if (result.status === 403) {
            return { redirect: `${process.env.NEXTAUTH_URL}/oauth/signup/kakao` };
          }

          if (user) {
            return {
              ...user,
              accessToken: user.accessToken,
            };
          }

          return null;
        } catch (error) {
          throw new Error();
        }
      },
    }),
    Credentials({
      id: "easySignup",
      name: "easySignup",
      credentials: {
        nickname: { label: "닉네임", type: "text" },
        token: { label: "토큰", type: "text" },
        provider: { label: "프로바이더", type: "text" },
      },
      async authorize(credentials) {
        try {
          const result = await fetch(`${process.env.BASE_URL}/auth/signUp/${credentials?.provider}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nickname: credentials?.nickname,
              redirectUri: `${process.env.REDIRECT_URI}/${credentials?.provider}`,
              token: credentials?.token,
            }),
          });

          const data = await result.json();
          const user = data?.user;

          if (result.ok && user) {
            cookies().delete("oauth-token");
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
    Credentials({
      name: "signin",
      id: "signin",
      credentials: {
        email: { label: "email", type: "email", placeholder: "user@email.com" },
        password: { label: "password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        try {
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
            return null;
          }

          return {
            ...user,
            accessToken: data.accessToken,
          };
        } catch (error) {
          throw new Error("로그인 과정에서 오류가 발생했어요.");
        }
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
    async signIn({ account, credentials, user }) {
      // 카카오 로그인 미가입자인 경우(redirect)
      if (user && user?.redirect) {
        cookies().set("oauth-token", credentials?.code as string);
        return false;
      }

      // 구글 로그인 가입자 & 미가입자
      if (account?.provider === "google") {
        const token = account?.id_token;
        try {
          const payload = {
            redirectUri: `${process.env.REDIRECT_URI}/${account?.provider}`,
            token,
          };
          const result = await fetch(`${process.env.BASE_URL}/auth/signIn/${account?.provider}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const data = await result.json();

          if (data.user) {
            /* eslint-disable no-param-reassign */
            user.id = data.user.id;
            return true;
          }

          if (result.status === 403 && data.message === "등록되지 않은 사용자입니다.") {
            cookies().set("oauth-token", token as string, { httpOnly: true, secure: true });
            return `/oauth/signup/${account?.provider}`;
          }

          return false;
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export default authOptions;
