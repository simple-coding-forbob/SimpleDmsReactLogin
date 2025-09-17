import * as yup from "yup";

// 부서 추가/수정용 스키마
const faqValidation = yup.object({
  title: yup.string().required("제목을 입력해주세요"),
  content: yup.string().required("내용을 입력해주세요"),
});

export default faqValidation;
