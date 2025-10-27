// axios 공통함수 : 벡엔드 연동IApiResponse

import type { INotice } from "../types/INotice";

import axiosInstance from "../common/axiosInstance";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/notice", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (nid: number) => {
  return axiosInstance.get(`/notice/${nid}`);
};

// 저장함수
const insert = (data: INotice) => {
  return axiosInstance.post("/notice", data);
};

// 수정함수
const update = (nid: number, data: INotice) => {
  return axiosInstance.put(`/notice/${nid}`, data);
};

// 삭제함수
const remove = (nid: number) => {
  return axiosInstance.delete(`/notice/${nid}`);
};

const NoticeService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default NoticeService;
