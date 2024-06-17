export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SIGNIN_VALIDATION = {
  EMAIL: {
    required: { value: true, message: "이메일은 필수 입력입니다." },
    pattern: {
      value: EMAIL_REGEX,
      message: "이메일 형식으로 작성해주세요.",
    },
  },
  PASSWORD: {
    required: { value: true, message: "비밀번호는 필수 입력입니다." },
  },
};
