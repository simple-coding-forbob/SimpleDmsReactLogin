// src/utils/registerValidation.ts
import * as Yup from "yup";
import messages from "../common/messages";

const registerValidation = Yup.object().shape({
  email: Yup.string()
    .email(messages.email)
    .required(messages.required),
  password: Yup.string()
    .min(6, messages.minLength(6))
    .required(messages.required),
  repassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], messages.missMatch)
    .required(messages.required),
  name: Yup.string()
    .min(2, messages.minLength(2))
    .required(messages.required),
  eno: Yup.number().typeError(messages.number)
    .min(4, messages.minLength(4))
    .required(messages.required),
});

export default registerValidation;
