// src/validation/authValidation.ts
import * as Yup from "yup";
import messages from "../common/messages";

const authValidation = Yup.object({
  email: Yup.string()
    .email(messages.email)
    .required(messages.required),
  password: Yup.string()
    .min(6, messages.minLength(6))
    .required(messages.required),
});

export default authValidation;
