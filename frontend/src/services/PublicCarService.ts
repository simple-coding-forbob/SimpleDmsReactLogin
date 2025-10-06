// axios 공통함수 : 벡엔드 연동IApiResponse

import type IPublicCar from "../types/IPublicCar";

import common from "../common/CommonService";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const findAll = () => {
  return common.get("/public-car/all");
};

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/public-car", {
    params: { searchKeyword, page, size },
  });
};

// 상세 조회
const get = (pid: number) => {
  return common.get(`/public-car/${pid}`);
};

// 저장함수
const insert = (data: IPublicCar) => {
  return common.post("/public-car", data);
};

// 수정함수
const update = (pid: number, data: IPublicCar) => {
  return common.put(`/public-car/${pid}`, data);
};

// 삭제함수
const remove = (pid: number) => {
  return common.delete(`/public-car/${pid}`);
};

const PublicCarService = {
  findAll,
  getAll,
  get,
  insert,
  update,
  remove,
};

export default PublicCarService;
