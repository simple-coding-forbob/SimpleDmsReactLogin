import * as yup from "yup";

// 부서 추가/수정용 스키마
const deptValidation = yup.object({
  dname: yup.string().required("부서명을 입력해주세요"),
  loc: yup.string().required("위치를 입력해주세요"),
});

export default deptValidation;
