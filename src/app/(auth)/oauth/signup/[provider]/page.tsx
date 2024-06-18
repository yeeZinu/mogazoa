"use client";

// import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { OauthSignUpForm } from "./_components/OauthSignUpForm";

type FormData = {
  nickname: string;
};

export default function OauthSignUpPage({ params }: { params: { provider: string } }) {
  const [oauthToken, setOauthToken] = useState<string | null>("");
  // const token = cookies().get('oauth-token');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { provider } = params;

  useEffect(() => {
    const allCookies = document.cookie;
    const cookieName = "oauth-token";
    const matchToken = allCookies.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
    const token = matchToken ? matchToken[2] : null;

    // if (!token) {
    //   router.push("/signin");
    // }

    setOauthToken(token);
  }, [router]);

  const handleEasySignUp = async (data: FormData) => {
    console.log("oauthToken:", oauthToken);
    const result = await signIn("easySignup", {
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
      </form>
      {/* <OauthSignUpForm /> */}
    </div>
  );
}
