import * as yup from "yup";

// 자유게시판 유효성 체크
const freeBoardValidation = yup.object({
  title: yup.string().required("제목을 입력해주세요"),
  content: yup.string().required("내용을 입력해주세요"),
});

export default freeBoardValidation;
