// FiledbService.ts
import type IApiResponse from "../types/IApiResponse";
import type IFileDb from "../types/IFileDb";
import common from "./CommonService";

// 전체 조회 (like 검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IFileDb[]>>(
    `/fileDb?searchKeyword=${searchKeyword}&page=${page}&size=${size}`
  );
};

// 삭제
const remove = (uuid: number) => {
  return common.delete(`/fileDb/${uuid}`);
};

// 업로드
const insert = (data: IFileDb) => {
  const formData = new FormData();
  formData.append("fileTitle", data.fileTitle);
  formData.append("fileContent", data.fileContent);
  if (data.fileData) {
    formData.append("fileData", data.fileData);
  }

  return common.post("/fileDb", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const FiledbService = {
  getAll,
  remove,
  insert,
};

export default FiledbService;
