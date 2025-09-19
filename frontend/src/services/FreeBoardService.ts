// axios 공통함수 : 벡엔드 연동IApiResponse

import type IApiResponse from "../types/IApiResponse";
import type IFreeBoard from "../types/IFreeBoard";
import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IFreeBoard[]>>(`/free-board?searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};

// 상세 조회
const get = (fid:number | null) => {
  return common.get<IApiResponse<IFreeBoard>>(`/free-board/${fid}`);
};

// 저장함수
const insert = (data:IFreeBoard) => {
  return common.post("/free-board", data);
};

// 수정함수
const update = (fid:number | null, data:IFreeBoard) => {
  return common.put(`/free-board/${fid}`, data);
};

// 삭제함수
const remove = (fid:number | null) => {
  return common.delete(`/free-board/${fid}`);
};

const FreeBoardService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default FreeBoardService;
