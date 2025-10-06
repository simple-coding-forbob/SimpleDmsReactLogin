// axios 공통함수 : 벡엔드 연동IApiResponse

import common from "../common/CommonService";
import type INewsBoard from "../types/INewsBoard";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/news-board", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (nid: number) => {
  return common.get(`/news-board/${nid}`);
};

// 저장함수
const insert = (data: INewsBoard) => {
  return common.post("/news-board", data);
};

// 수정함수
const update = (nid: number, data: INewsBoard) => {
  return common.put(`/news-board/${nid}`, data);
};

// 삭제함수
const remove = (nid: number) => {
  return common.delete(`/news-board/${nid}`);
};

const NewsBoardService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default NewsBoardService;
