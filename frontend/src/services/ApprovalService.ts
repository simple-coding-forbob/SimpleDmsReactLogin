// axios 공통함수 : 백엔드 연동
import type IApiResponse from "../types/IApiResponse";
import type IApproval from "../types/IApproval";

import common from "../common/CommonService";

// 내가 올린 문서 조회
const getAllDrafts = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IApproval[]>>("/approval-drafts", {
    params: { searchKeyword, page, size },
  });
};

// 내가 결재해야할 문서 조회
const getAllPending = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IApproval[]>>("/approval-pending", {
    params: { searchKeyword, page, size },
  });
};

// 내가 이미 결재한 문서 조회
const getAllCompleted = (searchKeyword: string, page: number, size: number) => {
  return common.get<IApiResponse<IApproval[]>>("/approval-completed", {
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

// 승인
const approval = (aid: number, data: IApproval) => {
  return common.put(`/approval/${aid}`, data);
};

// 반려
const reject = (aid: number, data: IApproval) => {
  return common.put(`/reject/${aid}`, data);
};

// 삭제 (기안자가 취소하거나 관리자 권한으로 삭제)
const remove = (aid: number) => {
  return common.delete(`/approval/${aid}`);
};

const ApprovalService = {
  getAllDrafts,
  getAllPending,
  getAllCompleted,
  get,
  insert,
  approval,
  reject,
  remove,
};

export default ApprovalService;
