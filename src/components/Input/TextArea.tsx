import { useState } from "react";
import { Controller, FieldValues, FieldErrors, Control, Path, RegisterOptions } from "react-hook-form";
import cn from "@/utils/classNames";
import styles from "./TextArea.module.scss";

type TextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  errors?: FieldErrors<T>;
  maxLength?: number;
  defaultValue?: string; // 기본 값을 옵셔널로 수정했습니다.
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea<T extends FieldValues>({
  name,
  className,
  control,
  rules,
  errors,
  maxLength,
  defaultValue = "",
  ...rest
}: TextAreaProps<T>) {
  const error = errors?.[name];
  const [charCount, setCharCount] = useState(defaultValue.length);

  return (
    <div className={cn(styles.container, className || styles.default)}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          ...rules,
          validate: (value) => (maxLength ? value.length <= maxLength : true),
        }}
        render={({ field: { onChange, value, ...field } }) => (
          <>
            <textarea
              className={cn(styles.textarea, error && styles.error)}
              onChange={(e) => {
                if (!maxLength || e.target.value.length <= maxLength) {
                  onChange(e);
                  setCharCount(e.target.value.length);
                }
              }}
              value={value}
              {...field}
              {...rest}
            />
            <div className={styles.charCount}>
              {charCount}
              {maxLength && `/${maxLength}`}
            </div>
            {error && <span className={styles.errorMessage}>{error.message as string}</span>}
          </>
        )}
      />
    </div>
  );
}
