import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const publicCarValidation = yup.object({
  carName: yup.string().required(messages.required),
  floor: yup.string().required(messages.required),
  capacity: yup.number().typeError(messages.number)
            .required(messages.required),
});

export default publicCarValidation;