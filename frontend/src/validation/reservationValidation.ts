import * as yup from "yup";

// 예약 유효성 체크
const reservationValidation = yup.object({
  mid: yup.number().typeError("id는 숫자여야 합니다")
        .required("회의실을 입력해주세요"),
  startTime: yup.date().typeError("올바른 날짜를 입력해주세요")
                .required("시작일을 입력해주세요")
                .min(new Date(), "과거 시간은 예약할 수 없습니다"),
  endTime: yup.date().typeError("올바른 날짜를 입력해주세요")
                .required("종료일을 입력해주세요")
                .min(yup.ref("startTime"), "종료일은 시작일 이후여야 합니다")
});

export default reservationValidation;
