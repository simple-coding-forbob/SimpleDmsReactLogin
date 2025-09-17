import * as yup from "yup";

// 파일 업로드용 스키마
const fileDbValidation = yup.object({
  fileTitle: yup.string().required("이미지명을 입력해주세요"),
  fileContent: yup.string().required("내용을 입력해주세요"),
  // fileData: yup.mixed().required("파일을 선택해주세요"),  // mixed(): 어떤 타입이든 허용
});

export default fileDbValidation;
