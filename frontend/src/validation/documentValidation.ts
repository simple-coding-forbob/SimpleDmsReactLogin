import * as yup from "yup";

// 문서 업로드용 유효성 검사 스키마
const documentValidation = yup.object({
  title: yup.string().required("문서 제목을 입력해주세요"),
  content: yup.string().required("문서 내용을 입력해주세요"),
});

export default documentValidation;
