import * as yup from "yup";
import constance from "../common/constance";
import messages from "../common/messages";

// 파일 업로드용 스키마
const fileDbValidation = yup.object({
  fileTitle: yup.string().required(messages.required),
  fileContent: yup.string().required(messages.required),
  fileData: yup
    .mixed()
    .nullable()                // null 허용(선택 안함)
    .test(
      "sizeTest",
      messages.fileSize,
      (value) => !value || (value instanceof File && value.size <= constance.fileSize)
    )
    .test(
      "typeTest",
      messages.fileType,
      (value) => !value || (value instanceof File && value.type?.startsWith("image/"))
    ),
});

export default fileDbValidation;
