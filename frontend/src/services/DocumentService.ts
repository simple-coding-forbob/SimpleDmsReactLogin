// DocumentService.ts
import type IApiResponse from "../types/IApiResponse";
import type IDocument from "../types/IDocument";
import common from "./CommonService";

// 전체 조회 (검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IDocument[]>>("/document", {
    params: { searchKeyword, page, size },
  });
};

// 삭제
const remove = (uuid: string) => {
  return common.delete(`/document/${uuid}`);
};

// 업로드 / 등록
const insert = (data: IDocument) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);

  if (data.fileData) {
    formData.append("fileData", data.fileData); 
  }

  return common.post("/document", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const DocumentService = {
  getAll,
  remove,
  insert
};

export default DocumentService;
