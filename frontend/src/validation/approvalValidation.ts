import * as yup from "yup";
import messages from "../common/messages";

// 문서 업로드용 유효성 검사 스키마
const approvalValidation = yup.object({
  docId: yup.number().typeError(messages.number).required(messages.required),
  approver: yup.number().typeError(messages.number).required(messages.required),
  seq: yup.number().typeError(messages.number).required(messages.required),
});

export default approvalValidation;
