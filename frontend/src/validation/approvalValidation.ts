import * as yup from "yup";

// 문서 업로드용 유효성 검사 스키마
const documentValidation = yup.object({
  uuid: yup.string().required("문서를 입력해주세요"),
  eno: yup
    .number()
    .typeError("숫자로 입력해주세요")
    .required("결재자 사원번호를 입력해주세요"),
  seq: yup
    .number()
    .typeError("숫자로 입력해주세요")
    .required("결재자 순번을 입력해주세요"),
});

export default documentValidation;
