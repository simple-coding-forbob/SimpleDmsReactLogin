// FiledbService.ts
import common from "../common/CommonService";
import type IGallery from "../types/IGallery";

// 전체 조회 (like 검색 + 페이징)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/gallery", {
    params: { searchKeyword, page, size },
  });
};

// 삭제
const remove = (uuid: number) => {
  return common.delete(`/gallery/${uuid}`);
};

// 업로드
const insert = (data: IGallery) => {
  const formData = new FormData();
  formData.append("galleryTitle", data.galleryTitle);
  if (data.fileData) {
    formData.append("fileData", data.fileData);
  }

  return common.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const GalleryService = {
  getAll,
  remove,
  insert,
};

export default GalleryService;
