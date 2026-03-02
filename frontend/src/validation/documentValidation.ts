import * as yup from "yup";
import messages from "../common/messages";

// 문서 업로드용 유효성 검사 스키마
const documentValidation = yup.object({
  title: yup.string().required(messages.required),
  content: yup.string().required(messages.required),
});

export default documentValidation;
