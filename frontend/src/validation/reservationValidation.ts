import * as yup from "yup";

// 예약 유효성 체크
const reservationValidation = yup.object({
  roomName: yup.string().required("회의실을 입력해주세요"),
  startTime: yup.date().required("시작일을 입력해주세요"),
  endTime: yup.date().required("종료일을 입력해주세요")
});

export default reservationValidation;
