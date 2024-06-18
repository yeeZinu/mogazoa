import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OauthSignUpForm } from "./_components/OauthSignUpForm";

type OauthSignUpPageProps = {
  params: {
    provider: string;
  };
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
