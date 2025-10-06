// axios 공통함수 : 벡엔드 연동IApiResponse

import common from "../common/CommonService";
import type IDept from "../types/IDept";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/dept", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (dno: number) => {
  return common.get(`/dept/${dno}`);
};

// 저장함수
const insert = (data: IDept) => {
  return common.post("/dept", data);
};

// 수정함수
const update = (dno: number, data: IDept) => {
  return common.put(`/dept/${dno}`, data);
};

// 삭제함수
const remove = (dno: number) => {
  return common.delete(`/dept/${dno}`);
};

const DeptService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default DeptService;
