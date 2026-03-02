import * as yup from "yup";
import constance from "../common/constance";
import messages from "../common/messages";

// 문서 업로드용 유효성 검사 스키마
const templateValidation = yup.object({
  title: yup.string().required(messages.required),
  content: yup.string().required(messages.required),
  fileData: yup
    .mixed().required("파일을 선택해주세요")
    .test(
      "sizeTest",
      messages.fileSize,
      (value) => value instanceof File && value.size <= constance.fileSize
    )
    .test(
      "typeTest",
      messages.fileType,
      (value) => value instanceof File && "application/pdf" === value.type
    ),
});

export default templateValidation;
