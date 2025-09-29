// axios 공통함수 : 백엔드 연동
import type IApiResponse from "../types/IApiResponse";
import type IApproval from "../types/IApproval";

import common from "./CommonService";

// 전체 문서 조회 + like 검색 (paging)
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IApproval[]>>("/approval", {
    params: { searchKeyword, page, size },
  });
};

// 단일 문서 상세 조회
const get = (aid: number) => {
  return common.get<IApiResponse<IApproval>>(`/approval/${aid}`);
};

// 신규 등록 (상신)
const insert = (data: IApproval) => {
  return common.post("/approval", data);
};

// 수정 (결재선 변경, 문서 수정 등)
const update = (aid: number, data: IApproval) => {
  return common.put(`/approval/${aid}`, data);
};

// 삭제 (기안자가 취소하거나 관리자 권한으로 삭제)
const remove = (aid: number) => {
  return common.delete(`/approval/${aid}`);
};

const ApprovalService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default ApprovalService;
