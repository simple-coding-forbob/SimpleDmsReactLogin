import * as yup from "yup";

// 자유게시판 유효성 체크
const newsBoardValidation = yup.object({
  subject: yup.string().required("제목을 입력해주세요"),
  text: yup.string().required("내용을 입력해주세요"),
});

export default newsBoardValidation;
