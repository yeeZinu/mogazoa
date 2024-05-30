"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  nickname: string;
};

export default function OauthSignUpPage({ params }: { params: { provider: string } }) {
  const [oauthToken, setOauthToken] = useState<string | null>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { provider } = params;

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    // js-cookie 라이브러리 도입 문의
    const allCookies = document.cookie;
    const cookieName = "oauth-token";
    const matchToken = allCookies.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
    const token = matchToken ? matchToken[2] : null;

    if (!token) {
      router.push("/signin");
    }

    setOauthToken(token);
  }, [router]);

  const handleEasySignUp = async (data: FormData) => {
    console.log("oauthToken:", oauthToken);
    const result = await signIn("EasySignUp", {
      redirect: false,
      nickname: data.nickname,
      token: oauthToken,
      provider,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      // router.push("/");
    }
  };

  return (
    <div>
      <h1>Oauth sign up page</h1>
      <form onSubmit={handleSubmit(handleEasySignUp)}>
        <input
          {...register("nickname", { required: "닉네임을 입력해주세요." })}
          placeholder='닉네임을 입력하세요'
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}
        <button type='submit'>submit</button>
        <p>
          {oauthToken}
          {provider}
        </p>
      </form>
    </div>
  );
}
