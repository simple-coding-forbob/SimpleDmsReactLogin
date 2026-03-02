// axios 공통함수 : 벡엔드 연동IApiResponse

<<<<<<< Updated upstream
import axiosInstance from "../common/axiosInstance";
import type { IFreeBoard } from "../types/IFreeBoard";
=======
import common from "../common/CommonService";
import type {IFreeBoard} from "../types/IFreeBoard";
>>>>>>> Stashed changes

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/free-board", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (fid: number) => {
  return axiosInstance.get(`/free-board/${fid}`);
};

// 저장함수
const insert = (data: IFreeBoard) => {
  return axiosInstance.post("/free-board", data);
};

// 수정함수
const update = (fid: number, data: IFreeBoard) => {
  return axiosInstance.put(`/free-board/${fid}`, data);
};

// 삭제함수
const remove = (fid: number) => {
  return axiosInstance.delete(`/free-board/${fid}`);
};

const FreeBoardService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default FreeBoardService;
