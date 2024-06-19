"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { OauthSignInButton } from "@/auth/_components/OauthSignInButton";
import { GOOGLE_ICON, KAKAO_ICON } from "@/utils/constant";
import styles from "./OauthSignInBox.module.scss";

export default function OauthSignInBox() {
  const router = useRouter();
  const handleKakaoSignIn = async () => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
    // 인가 코드 요청
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      scope: "openid",
    });
  };

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code") ?? "";

      if (!localStorage.getItem("authCode") && code) {
        // 다시 redirect됐을 경우 요청 두 번 방지
        localStorage.setItem("authCode", code);
        const result = await signIn("kakao", { redirect: false, callbackUrl: "/", code });

        if (result?.status === 403) {
          localStorage.removeItem("authCode");
          router.push("/oauth/signup/kakao");
        }
      } else {
        localStorage.removeItem("authCode");
      }
    };
    handleKakaoCallback();
  }, [router]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>SNS로 바로 시작하기</p>
      <div className={styles.oauthButtonBox}>
        <OauthSignInButton
          image={GOOGLE_ICON}
          name='google'
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
        <OauthSignInButton
          image={KAKAO_ICON}
          name='kakao'
          onClick={handleKakaoSignIn}
        />
      </div>
    </div>
  );
}
