import * as yup from "yup";
import messages from "../common/messages";

const empValidation = yup.object({
  ename: yup.string().required(messages.required),
  job: yup.string().required(messages.required),
  manager: yup.number().typeError(messages.number)
            .required(messages.required),
  hiredate: yup.date().required(messages.required),
  salary: yup.number().required(messages.required),
  commission: yup.number().required(messages.required),
  dno: yup.number().required(messages.required),
});

export default empValidation;
