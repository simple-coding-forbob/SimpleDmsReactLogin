import * as yup from "yup";

const empValidation = yup.object({
  ename: yup.string().required("사원명을 입력해주세요"),
  job: yup.string().required("직위를 입력해주세요"),
  manager: yup.number().required("매니저 사원번호를 입력해주세요"),
  hiredate: yup.date().required("날짜를 입력해주세요"),
  salary: yup.number().required("급여를 입력해주세요"),
  commission: yup.number().required("상여금를 입력해주세요"),
  dno: yup.number().required("부서번호를 입력해주세요"),
});

export default empValidation;
