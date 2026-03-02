// messages.ts

import constance from "./constance";

// TODO: 화면 관련 에러/성공/안내 메세지만 표시하세요(벡엔드 에러 제외)
const messages = {
  // TODO: 일반 에러/성공메세지
  contactAdmin: "오류가 발생했습니다. 관리자에게 문의하세요",
  save: "저장되었습니다",
  update: "수정되었습니다",
  delete: "삭제되었습니다.",
  uuidNotFound: "uuid가 존재하지 않습니다.",
  noSelectedFile: "선택된 파일이 없습니다.",

  // TODO: 유효성 에러메세지
  required: "필수 입력입니다.",
  number: "숫자로 입력해주세요",
  date: "올바른 날짜를 입력해주세요",
  email: "유효한 이메일을 입력하세요",
  missMatch: "비밀번호가 일치하지 않습니다",
  minLength: (len: number) => `${len}자 이상 입력해주세요.`,
  maxLength: (len: number) => `${len}자 이하로 입력해주세요.`,
  minStartTime: "과거 시간은 예약할 수 없습니다",
  minEndTime: "종료일은 시작일 이후여야 합니다",
  fileSize: `파일 용량은 ${constance.fileSize/1024/1024}MB 이하만 가능합니다`,
  fileType: "허용된 파일 형식이 아닙니다 (PDF)"
};

export default messages;
