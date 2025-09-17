// axios 공통함수 : 벡엔드 연동IApiResponse

import type IApiResponse from "../types/IApiResponse";
import type IFaq from "../types/IFaq";

import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IFaq[]>>(`/faq?searchKeyword=${searchKeyword}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (fno:number | null) => {
  return common.get<IApiResponse<IFaq>>(`/faq/${fno}`);
};

// 저장함수
const insert = (data:IFaq) => {
  return common.post("/faq", data);
};

// 수정함수
const update = (fno:number | null, data:IFaq) => {
  return common.put(`/faq/${fno}`, data);
};

// 삭제함수
const remove = (fno:number | null) => {
  return common.delete(`/faq/${fno}`);
};

const FaqService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default FaqService;
