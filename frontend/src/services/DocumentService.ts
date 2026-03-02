// DocumentService.ts
<<<<<<< Updated upstream
import axiosInstance from "../common/axiosInstance";
import type { IDocument } from "../types/IDocument";
=======
import common from "../common/CommonService";
import type {IDocument} from "../types/IDocument";
>>>>>>> Stashed changes

// 전체 조회 (검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/document", {
    params: { searchKeyword, page, size },
  });
};  

// pdf 다운로드 함수
const viewPdf = (docId: number) => {
  return axiosInstance.get(`/document/pdf/${docId}`, {
    responseType: "blob", // 반드시 blob으로 지정해야 함
  });
};

// 상세 조회
const get = (docId: number) => {
  return axiosInstance.get(`/document/${docId}`);
};

// 삭제
const remove = (docId: number) => {
  return axiosInstance.delete(`/document/${docId}`);
};

// 저장함수
const insert = (data: IDocument) => {
  return axiosInstance.post("/document", data);
};

const DocumentService = {
  getAll,
  viewPdf,
  get,
  remove,
  insert
};

export default DocumentService;
