"use client";

import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import cn from "@/utils/classNames";
import { EYE_OFF_ICON, EYE_ON_ICON } from "@/utils/constant";
import styles from "./Input.module.scss";

type InputProps = {
  name: string;
  type?: "email" | "text" | "password";
  label?: string;
  placeholder?: string;
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: { ["type"]: () => string };
};

export default function Input({
  name,
  label,
  type,
  placeholder,
  required,
  minLength,
  maxLength,
  pattern,
  validate,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const handleEyeIconClick = () => setShowPassword((prev: boolean) => !prev);

  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <div className={styles.inputBox}>
        <input
          className={cn(styles.input, errors[name] && styles.error)}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name, { required, minLength, maxLength, pattern, validate })}
        />
        {type === "password" && (
          <Image
            className={styles.eyeIcon}
            src={showPassword ? EYE_ON_ICON : EYE_OFF_ICON}
            alt='eye'
            onClick={handleEyeIconClick}
            width={18}
            height={18}
          />
        )}
      </div>
      {errors[name] && <p className={styles.errorMessage}>{errors[name]?.message?.toString()}</p>}
    </div>
  );
}
