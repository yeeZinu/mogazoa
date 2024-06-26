import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OauthSignUpForm } from "./_components/OauthSignUpForm";

type OauthSignUpPageProps = {
  params: {
    provider: string;
  };
};

export const metadata: Metadata = {
  title: "간편 회원가입 - Mogazoa",
};

export default async function OauthSignUpPage({ params }: OauthSignUpPageProps) {
  const token = cookies().get("oauth-token");
  const { provider } = params;

  if (!token) {
    redirect("/signin");
  }

  return (
    <div>
      <OauthSignUpForm
        provider={provider}
        token={token?.value}
      />
    </div>
  );
}
