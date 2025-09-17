// axios 공통함수 : 벡엔드 연동IApiResponse
import type IApiResponse from "../types/IApiResponse";
import type IQna from "../types/IQna";

import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IQna[]>>(`/qna?searchKeyword=${searchKeyword}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (qno:number | null) => {
  return common.get<IApiResponse<IQna>>(`/qna/${qno}`);
};

// 저장함수
const insert = (data:IQna) => {
  return common.post("/qna", data);
};

// 수정함수
const update = (qno:number | null, data:IQna) => {
  return common.put(`/qna/${qno}`, data);
};

// 삭제함수
const remove = (qno:number | null) => {
  return common.delete(`/qna/${qno}`);
};

const QnaService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default QnaService;
