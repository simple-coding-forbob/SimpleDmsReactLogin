import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const faqValidation = yup.object({
  title: yup.string().required(messages.required),
  content: yup.string().required(messages.required),
});

export default faqValidation;
