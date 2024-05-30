import { cookies } from "next/headers";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_REST_API_KEY!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "유저 이메일", type: "email", placeholder: "user@email.com" },
        password: { label: "패스워드", type: "password" },
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
          throw new Error("No user found");
        }

        return {
          ...user,
          accessToken: data.accessToken,
        };
      },
    }),
    CredentialsProvider({
      name: "EasySignUp",
      credentials: {
        nickname: { label: "닉네임", type: "text" },
        token: { label: "토큰", type: "text" },
        provider: { label: "프로바이더", type: "text" },
      },
      async authorize(credentials) {
        const result = await fetch(`${process.env.BASE_URL}/auth/signUp/${credentials?.provider}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: credentials?.nickname,
            redirectUri: `http://localhost:3000/api/auth/callback/${credentials?.provider}`,
            token: credentials?.token,
          }),
        });
        const data = await result.json();
        const user = data?.user;
        if (!user) {
          throw new Error("failed to signup!");
        }

        return {
          ...user,
          accessToken: data.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
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
    async signIn({ account }) {
      if (account?.provider !== "credentials") {
        console.log(account);
        const token = account?.provider === "google" ? account?.id_token : account?.access_token;
        try {
          const payload = {
            redirectUri: `http://localhost:3000/api/auth/callback/${account?.provider}`,
            token,
          };
          console.log("Payload:", payload);
          const result = await fetch(`${process.env.BASE_URL}/auth/signIn/${account?.provider}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          const data = await result.json();
          console.log("Response:", data);
          console.log("status:", result.status);
          if (data.user) {
            return true;
          }
          if (result.status === 403 && data.message === "등록되지 않은 사용자입니다.") {
            cookies().set("oauth-token", token as string);
            console.log("redirect");

            return `/oauth/signup/${account?.provider}`;
          }
          return false;
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
