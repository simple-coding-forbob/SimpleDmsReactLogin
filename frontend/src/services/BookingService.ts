// axios 공통함수 : 벡엔드 연동IApiResponse

import type IBooking from "../types/IBooking";

import common from "../common/CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getStatusAll = () => {
  return common.get("/booking/status");
};

const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/booking", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (mid: number) => {
  return common.get(`/booking/${mid}`);
};

// 저장함수
const insert = (data: IBooking) => {
  return common.post("/booking", data);
};

// 수정함수
const update = (mid: number, data: IBooking) => {
  return common.put(`/booking/${mid}`, data);
};

// 삭제함수
const remove = (mid: number) => {
  return common.delete(`/booking/${mid}`);
};

const BookingService = {
  getStatusAll,
  getAll,
  get,
  insert,
  update,
  remove,
};

export default BookingService;
