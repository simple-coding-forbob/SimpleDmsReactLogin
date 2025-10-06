// axios 공통함수 : 벡엔드 연동IApiResponse

import type IReservation from "../types/IReservation";

import common from "../common/CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getStatusAll = () => {
  return common.get("/reservation/status");
};

const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/reservation", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (rid: number) => {
  return common.get(`/reservation/${rid}`);
};

// 저장함수
const insert = (data: IReservation) => {
  return common.post("/reservation", data);
};

// 수정함수
const update = (rid: number, data: IReservation) => {
  return common.put(`/reservation/${rid}`, data);
};

// 삭제함수
const remove = (rid: number) => {
  return common.delete(`/reservation/${rid}`);
};

const ReservationService = {
  getStatusAll,
  getAll,
  get,
  insert,
  update,
  remove,
};

export default ReservationService;
