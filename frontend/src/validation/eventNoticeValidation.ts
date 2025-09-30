import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const eventNoticeValidation = yup.object({
  subject: yup.string().required(messages.required),
  text: yup.string().required(messages.required),
  isVisible: yup.string().required(messages.required)
});

export default eventNoticeValidation;