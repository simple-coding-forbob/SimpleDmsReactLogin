// axios 공통함수 : 벡엔드 연동IApiResponse

<<<<<<< Updated upstream
import type { IMeetingRoom } from "../types/IMeetingRoom";
=======
import type {IMeetingRoom} from "../types/IMeetingRoom";
>>>>>>> Stashed changes

import axiosInstance from "../common/axiosInstance";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const selectAll = () => {
  return axiosInstance.get("/meeting-room/all");
};

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/meeting-room", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (mid: number) => {
  return axiosInstance.get(`/meeting-room/${mid}`);
};

// 저장함수
const insert = (data: IMeetingRoom) => {
  return axiosInstance.post("/meeting-room", data);
};

// 수정함수
const update = (mid: number, data: IMeetingRoom) => {
  return axiosInstance.put(`/meeting-room/${mid}`, data);
};

// 삭제함수
const remove = (mid: number) => {
  return axiosInstance.delete(`/meeting-room/${mid}`);
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
