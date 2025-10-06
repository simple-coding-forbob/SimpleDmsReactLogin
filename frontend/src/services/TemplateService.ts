// DocumentService.ts
import common from "../common/CommonService";
import type ITemplate from "../types/ITemplate";

// 전체 조회 (검색 + 페이징)
const selectAll = () => {
  return common.get("/template/all");
};  

// 전체 조회 (검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/template", {
    params: { searchKeyword, page, size },
  });
};  

// pdf 다운로드 함수
const viewPdf = (docId: number) => {
  return common.get(`/template/pdf/${docId}`, {
    responseType: "blob", // 반드시 blob으로 지정해야 함
  });
};

// 상세 조회
const get = (docId: number) => {
  return common.get(`/template/${docId}`);
};

// 삭제
const remove = (docId: number) => {
  return common.delete(`/template/${docId}`);
};

// 저장함수
const insert = (data: ITemplate) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  if (data.fileData) {
    formData.append("fileData", data.fileData);
  }

  return common.post("/template", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const TemplateService = {
  selectAll,
  getAll,
  viewPdf,
  get,
  remove,
  insert
};

export default TemplateService;
