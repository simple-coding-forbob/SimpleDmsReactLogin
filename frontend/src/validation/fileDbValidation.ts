import * as yup from "yup";
import messages from "../common/messages";

// 파일 업로드용 스키마
const fileDbValidation = yup.object({
  fileTitle: yup.string().required(messages.required),
  fileContent: yup.string().required(messages.required),
});

export default fileDbValidation;
