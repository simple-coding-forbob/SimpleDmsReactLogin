import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const qnaValidation = yup.object({
  questioner: yup.string().required(messages.required),
  question: yup.string().required(messages.required),
  answerer: yup.string().required(messages.required),
  answer: yup.string().required(messages.required),
});

export default qnaValidation;