import { Path, UseFormRegister, FieldValues, RegisterOptions, FieldErrors } from "react-hook-form";
import cn from "@/utils/classNames";
import styles from "./Input.module.scss";

type InputProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
  errors?: FieldErrors<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input<T extends FieldValues>({
  name,
  className,
  register,
  rules,
  errors,
  ...rest
}: InputProps<T>) {
  const error = errors?.[name];
  return (
    <div className={cn(className, styles.container)}>
      <input
        className={cn(styles.input, error && styles.error)}
        {...register(name, rules)}
        {...rest}
      />
      {error && <span className={styles.errorMessage}>{error.message as string}</span>}
    </div>
  );
}
