// src/utils/registerValidation.ts
import * as Yup from "yup";

const registerValidation = Yup.object().shape({
  email: Yup.string()
    .email("유효한 이메일을 입력하세요")
    .required("이메일은 필수 입력입니다"),
  password: Yup.string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다")
    .required("비밀번호는 필수 입력입니다"),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인은 필수 입력입니다"),
  name: Yup.string()
    .min(2, "이름은 최소 2자 이상이어야 합니다")
    .required("이름은 필수 입력입니다"),
  eno: Yup.number().typeError("eno는 숫자여야 합니다")
    .min(4, "사원번호는 최소 4자 이상이어야 합니다")
    .required("사원번호는 필수 입력입니다"),
});

export default registerValidation;
