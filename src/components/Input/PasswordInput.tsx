import Image from "next/image";
import { useState } from "react";
import { Path, UseFormRegister, FieldValues, RegisterOptions, FieldErrors } from "react-hook-form";
import cn from "@/utils/classNames";
import { EYE_OFF_ICON, EYE_ON_ICON } from "@/utils/constant";
import styles from "./Input.module.scss";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
  errors?: FieldErrors<T>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export default function PasswordInput<T extends FieldValues>({
  name,
  className,
  register,
  rules,
  errors,
  ...rest
}: PasswordInputProps<T>) {
  const error = errors?.[name];
  const [showPassword, setShowPassword] = useState(false);
  const handleEyeIconClick = () => setShowPassword((prev: boolean) => !prev);

  return (
    <div className={cn(className, styles.container)}>
      <div className={styles.inputBox}>
        <input
          className={cn(styles.input, error && styles.error)}
          type={showPassword ? "text" : "password"}
          {...register(name, rules)}
          {...rest}
        />
        <Image
          className={styles.eyeIcon}
          src={showPassword ? EYE_ON_ICON : EYE_OFF_ICON}
          alt='eye'
          onClick={handleEyeIconClick}
          width={18}
          height={18}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error.message as string}</span>}
    </div>
  );
}
