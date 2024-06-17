import { useState } from "react";
import { Path, UseFormRegister, FieldValues, RegisterOptions, FieldErrors } from "react-hook-form";
import cn from "@/utils/classNames";
import styles from "./TextArea.module.scss";

type TextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
  errors?: FieldErrors<T>;
  maxLength?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea<T extends FieldValues>({
  name,
  className,
  register,
  rules,
  errors,
  maxLength,
  ...rest
}: TextAreaProps<T>) {
  const error = errors?.[name];
  const [charCount, setCharCount] = useState(0);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setCharCount(event.target.value.length);
  return (
    <div className={cn(styles.container, className || styles.default)}>
      <textarea
        className={cn(styles.textarea, error && styles.error)}
        {...register(name, { ...rules, onChange: handleInputChange })}
        {...rest}
      />
      <div className={styles.charCount}>
        {charCount}
        {maxLength && `/${maxLength}`}
      </div>
      {error && <span className={styles.errorMessage}>{error.message as string}</span>}
    </div>
  );
}
