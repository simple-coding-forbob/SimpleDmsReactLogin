import * as yup from "yup";

// 파일 업로드용 스키마
const fileDbValidation = yup.object({
  fileTitle: yup.string().required("이미지명을 입력해주세요"),
  fileContent: yup.string().required("내용을 입력해주세요"),
});

export default fileDbValidation;
