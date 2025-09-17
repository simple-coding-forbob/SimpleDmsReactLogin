import * as yup from "yup";

// 부서 추가/수정용 스키마
const noticeValidation = yup.object({
  title: yup.string().required("제목을 입력해주세요"),
  content: yup.string().required("내용을 입력해주세요"),
  isVisible: yup.string().required("보기여부를 입력해주세요")
});

export default noticeValidation;