import * as yup from "yup";
import messages from "../common/messages";

// 예약 유효성 체크
const bookingValidation = yup.object({
  pid: yup.number().typeError(messages.number)
          .required(messages.required),
  startTime: yup.date().required(messages.required)
                .min(new Date(), messages.minStartTime),
  endTime: yup.date().required(messages.required)
                .min(yup.ref("startTime"), messages.minEndTime)
});

export default bookingValidation;
