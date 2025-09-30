import * as yup from "yup";
import messages from "../common/messages";

// 문서 업로드용 유효성 검사 스키마
const documentValidation = yup.object({
  uuid: yup.string().required(messages.required),
  eno: yup
    .number()
    .typeError(messages.number)
    .required(messages.required),
  seq: yup
    .number()
    .typeError(messages.number)
    .required(messages.required),
});

export default documentValidation;
