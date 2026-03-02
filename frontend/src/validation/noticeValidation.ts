import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const noticeValidation = yup.object({
  title: yup.string().required(messages.required),
  content: yup.string().required(messages.required),
  isVisible: yup.string().required(messages.required)
});

export default noticeValidation;