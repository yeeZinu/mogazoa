"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { OauthSignInButton } from "@/auth/_components/OauthSignInButton";
import { GOOGLE_ICON, KAKAO_ICON } from "@/utils/constant";
import styles from "./OauthSignInBox.module.scss";

type OauthSignInBoxProps = {
  requestPage: string;
};

export default function OauthSignInBox({ requestPage }: OauthSignInBoxProps) {
  const router = useRouter();
  const handleKakaoSignIn = async () => {
    if (!window) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN}/${requestPage}`,
      scope: "openid",
    });
  };

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code") ?? "";

      if (!localStorage.getItem("authCode") && code) {
        // 다시 redirect됐을 경우 요청 두 번 방지
        localStorage.setItem("authCode", code);
        const result = await signIn("kakao", { redirect: false, callbackUrl: "/", code, requestPage });

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
