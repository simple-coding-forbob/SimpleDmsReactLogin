import * as yup from "yup";
import messages from "../common/messages";

// 자유게시판 유효성 체크
const newsBoardValidation = yup.object({
  subject: yup.string().required(messages.required),
  text: yup.string().required(messages.required),
});

export default newsBoardValidation;
