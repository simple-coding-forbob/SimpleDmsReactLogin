import * as yup from "yup";

// 부서 추가/수정용 스키마
const qnaValidation = yup.object({
  questioner: yup.string().required("질문자를 입력해주세요"),
  question: yup.string().required("질문을 입력해주세요"),
  answerer: yup.string().required("답변자를 입력해주세요"),
  answer: yup.string().required("답변을 입력해주세요"),
});

export default qnaValidation;