const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^[a-z0-9!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?`~]{8,}$/i;

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

export const SIGNUP_VALIDATION = {
  email: {
    required: { value: true, message: "이메일은 필수 입력입니다." },
    pattern: {
      value: EMAIL_REGEX,
      message: "이메일 형식으로 작성해주세요.",
    },
  },
  nickname: {
    required: { value: true, message: "닉네임은 필수 입력입니다." },
    maxLength: { value: 20, message: "닉네임은 최대 20자까지 가능합니다." },
  },
  password: {
    required: { value: true, message: "비밀번호는 필수 입력입니다." },
    minLength: { value: 8, message: "비밀번호는 최소 8자 이상입니다." },
    pattern: { value: PASSWORD_REGEX, message: "비밀번호는 숫자, 영문, 특수문자로만 이루어져야 합니다." },
  },
  passwordConfirmation: {
    required: { value: true, message: "비밀번호 확인을 입력해주세요." },
  },
};
