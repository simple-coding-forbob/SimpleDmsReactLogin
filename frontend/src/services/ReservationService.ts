// axios 공통함수 : 벡엔드 연동IApiResponse

import type IApiResponse from "../types/IApiResponse";
import type IReservation from "../types/IReservation";

import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IReservation[]>>(`/reservation?searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};

// 상세 조회
const get = (rid:number | null) => {
  return common.get<IApiResponse<IReservation>>(`/reservation/${rid}`);
};

// 저장함수
const insert = (data:IReservation) => {
  return common.post("/reservation", data);
};

// 수정함수
const update = (rid:number | null, data:IReservation) => {
  return common.put(`/reservation/${rid}`, data);
};

// 삭제함수
const remove = (rid:number | null) => {
  return common.delete(`/reservation/${rid}`);
};

const ReservationService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default ReservationService;
