"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { SignInForm } from "./_components/SignInForm";
import { OauthSignInBox } from "./_components/OauthSignInBox";
import styles from "./SignInPage.module.scss";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignInForm />
      <OauthSignInBox />
    </div>
  );
}
