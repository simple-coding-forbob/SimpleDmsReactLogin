// FiledbService.ts
import axiosInstance from "../common/axiosInstance";
import type { IFileDb } from "../types/IFileDb";

// 전체 조회 (like 검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/fileDb", {
    params: { searchKeyword, page, size },
  });
};

// 삭제
const remove = (uuid: number) => {
  return axiosInstance.delete(`/fileDb/${uuid}`);
};

// 업로드
const insert = (data: IFileDb) => {
  const formData = new FormData();
  formData.append("fileTitle", data.fileTitle);
  formData.append("fileContent", data.fileContent);
  if (data.fileData) {
    formData.append("fileData", data.fileData);
  }

  return axiosInstance.post("/fileDb", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const FiledbService = {
  getAll,
  remove,
  insert,
};

export default FiledbService;
