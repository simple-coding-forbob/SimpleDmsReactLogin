// DocumentService.ts
import type IApiResponse from "../types/IApiResponse";
import type IDocument from "../types/IDocument";
import common from "../common/CommonService";

// 전체 조회 (검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IDocument[]>>("/document", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (docId: string) => {
  return common.get<IApiResponse<IDocument>>(`/document/${docId}`);
};

// 삭제
const remove = (docId: string) => {
  return common.delete(`/document/${docId}`);
};

// 저장함수
const insert = (data: IDocument) => {
  return common.post("/document", data);
};

const DocumentService = {
  getAll,
  get,
  remove,
  insert
};

export default DocumentService;
