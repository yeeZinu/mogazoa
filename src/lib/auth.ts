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
              redirectUri: "http://localhost:3000/signin",
              token: credentials?.code,
            }),
          });

          const data = await result.json();
          const user = data?.user;

          console.log(data);
          console.log(result.status);

          if (result.status === 403) {
            return { redirect: "http://localhost:3000/oauth/signup/kakao" };
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
      /**
       * 간편 회원가입
       * @TODO : 에러 처리
       */
      id: "EasySignUp",
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
            redirectUri: `${process.env.REDIRECT_URI}/${credentials?.provider}`,
            token: credentials?.token,
          }),
        });
        const data = await result.json();
        const user = data?.user;

        return {
          ...user,
          accessToken: data.accessToken,
        };
      },
    }),
    Credentials({
      name: "SignIn",
      id: "signin",
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
      console.log("account: ", account);
      console.log("credentials: ", credentials);

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

          if (data.user) {
            return true;
          }

          if (result.status === 403 && data.message === "등록되지 않은 사용자입니다.") {
            cookies().set("oauth-token", token as string);
            return `/oauth/signup/${account?.provider}`;
          }

          return false;
        } catch (error) {
          console.log(error);
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
  secret: process.env.SECRET,
};

export default authOptions;
