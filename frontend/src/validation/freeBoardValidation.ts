import * as yup from "yup";
import messages from "../common/messages";

// 자유게시판 유효성 체크
const freeBoardValidation = yup.object({
  title: yup.string().required(messages.required),
  content: yup.string().required(messages.required),
});

export default freeBoardValidation;
