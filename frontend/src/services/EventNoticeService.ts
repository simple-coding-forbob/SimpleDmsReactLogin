// axios 공통함수 : 벡엔드 연동IApiResponseIEventNotice

import type IApiResponse from "../types/IApiResponse";
import type IEventNotice from "../types/IEventNotice";

import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IEventNotice[]>>(`/event-notice?searchKeyword=${searchKeyword}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (eid:number | null) => {
  return common.get<IApiResponse<IEventNotice>>(`/event-notice/${eid}`);
};

// 저장함수
const insert = (data:IEventNotice) => {
  return common.post("/event-notice", data);
};

// 수정함수
const update = (eid:number | null, data:IEventNotice) => {
  return common.put(`/event-notice/${eid}`, data);
};

// 삭제함수
const remove = (eid:number | null) => {
  return common.delete(`/event-notice/${eid}`);
};

const EventNoticeService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default EventNoticeService;
