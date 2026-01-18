// axios 공통함수 : 벡엔드 연동IApiResponse

import type { IFaq } from "../types/IFaq";

import axiosInstance from "../common/axiosInstance";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/faq", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (fno: number) => {
  return axiosInstance.get(`/faq/${fno}`);
};

// 저장함수
const insert = (data: IFaq) => {
  return axiosInstance.post("/faq", data);
};

// 수정함수
const update = (fno: number, data: IFaq) => {
  return axiosInstance.put(`/faq/${fno}`, data);
};

// 삭제함수
const remove = (fno: number) => {
  return axiosInstance.delete(`/faq/${fno}`);
};

const FaqService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default FaqService;
