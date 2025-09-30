import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const deptValidation = yup.object({
  dname: yup.string().required(messages.required),
  loc: yup.string().required(messages.required),
});

export default deptValidation;
