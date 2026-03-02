// axios 공통함수 : 벡엔드 연동IApiResponse
<<<<<<< Updated upstream
import type { IQna } from "../types/IQna";
=======
import type {IQna} from "../types/IQna";
>>>>>>> Stashed changes

import axiosInstance from "../common/axiosInstance";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/qna", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (qno: number) => {
  return axiosInstance.get(`/qna/${qno}`);
};

// 저장함수
const insert = (data: IQna) => {
  return axiosInstance.post("/qna", data);
};

// 수정함수
const update = (qno: number, data: IQna) => {
  return axiosInstance.put(`/qna/${qno}`, data);
};

// 삭제함수
const remove = (qno: number) => {
  return axiosInstance.delete(`/qna/${qno}`);
};

const QnaService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default QnaService;
