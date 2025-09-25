// axios 공통함수 : 벡엔드 연동IApiResponse

import type IApiResponse from "../types/IApiResponse";
import type INotice from "../types/INotice";

import common from "./CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<INotice[]>>("/notice?searchKeyword", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (nid: number) => {
  return common.get<IApiResponse<INotice>>(`/notice/${nid}`);
};

// 저장함수
const insert = (data: INotice) => {
  return common.post("/notice", data);
};

// 수정함수
const update = (nid: number, data: INotice) => {
  return common.put(`/notice/${nid}`, data);
};

// 삭제함수
const remove = (nid: number) => {
  return common.delete(`/notice/${nid}`);
};

const NoticeService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default NoticeService;
