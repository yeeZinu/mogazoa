import { cookies } from "next/headers";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import getAuth from "@/app/(auth)/_utils/getAuth";

const END_POINT = {
  SIGNUP: "/auth/signUp",
  SIGNIN: "/auth/signIn",
  OAUTHSIGNUP: "/oauth/signup",
  KAKAO: "/kakao",
  GOOGLE: "/google",
};

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
        requestPage: { type: "text", label: "요청 페이지" },
      },
      async authorize(credentials) {
        try {
          const { result, data } = await getAuth({
            path: `${END_POINT.SIGNIN}${END_POINT.KAKAO}`,
            body: {
              redirectUri: `${process.env.NEXTAUTH_URL}/${credentials?.requestPage}`,
              token: credentials?.code ?? "",
            },
          });

          if (result.status === 403) {
            return {
              redirect: `${process.env.NEXTAUTH_URL}${END_POINT.OAUTHSIGNUP}${END_POINT.KAKAO}`,
            };
          }

          if (data?.user) {
            return {
              ...data?.user,
              accessToken: data.accessToken,
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
          const { result, data } = await getAuth({
            path: `${END_POINT.SIGNUP}${credentials?.provider}`,
            body: {
              nickname: credentials?.nickname ?? "",
              redirectUri: `${process.env.REDIRECT_URI}/${credentials?.provider}`,
              token: credentials?.token ?? "",
            },
          });

          if (result.ok && data?.user) {
            cookies().delete("oauth-token");
            return {
              ...data?.user,
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
          const { data } = await getAuth({
            path: END_POINT.SIGNIN,
            body: {
              email: credentials?.email ?? "",
              password: credentials?.password ?? "",
            },
          });

          if (!data?.user) {
            return null;
          }

          return {
            ...data?.user,
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
          const { result, data } = await getAuth({
            path: END_POINT.SIGNUP,
            body: {
              email: credentials?.email ?? "",
              nickname: credentials?.nickname ?? "",
              password: credentials?.password ?? "",
              passwordConfirmation: credentials?.passwordConfirmation ?? "",
            },
          });

          if (result.ok && data?.user) {
            return {
              ...data?.user,
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
        const token = account?.id_token ?? "";
        try {
          const payload = {
            redirectUri: `${process.env.REDIRECT_URI}/${account?.provider}`,
            token,
          };
          const { result, data } = await getAuth({
            path: `${END_POINT.SIGNIN}${account?.provider}`,
            body: payload,
          });

          if (data.user) {
            /* eslint-disable no-param-reassign */
            user.id = data.user.id;
            user.accessToken = data.accessToken;

            return true;
          }

          if (result.status === 403 && data.message === "등록되지 않은 사용자입니다.") {
            cookies().set("oauth-token", token as string, { httpOnly: true, secure: true });
            return `${END_POINT.OAUTHSIGNUP}${account?.provider}`;
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
