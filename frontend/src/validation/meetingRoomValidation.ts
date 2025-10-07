import * as yup from "yup";
import messages from "../common/messages";

// 부서 추가/수정용 스키마
const meetingRoomValidation = yup.object({
  roomName: yup.string().required(messages.required),
  loc: yup.string().required(messages.required),
  capacity: yup.number().typeError(messages.number)
            .required(messages.required),
});

export default meetingRoomValidation;