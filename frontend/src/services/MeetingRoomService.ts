// axios 공통함수 : 벡엔드 연동IApiResponse

import type IMeetingRoom from "../types/IMeetingRoom";

import common from "../common/CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const selectAll = () => {
  return common.get("/meeting-room/all");
};

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/meeting-room", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (mid: number) => {
  return common.get(`/meeting-room/${mid}`);
};

// 저장함수
const insert = (data: IMeetingRoom) => {
  return common.post("/meeting-room", data);
};

// 수정함수
const update = (mid: number, data: IMeetingRoom) => {
  return common.put(`/meeting-room/${mid}`, data);
};

// 삭제함수
const remove = (mid: number) => {
  return common.delete(`/meeting-room/${mid}`);
};

const MeetingRoomService = {
  selectAll,
  getAll,
  get,
  insert,
  update,
  remove,
};

export default MeetingRoomService;
