// axios 공통함수 : 벡엔드 연동

import common from "../common/CommonService";
import type IEmp from "../types/IEmp";

const getAll = (searchKeyword: string, page: number, size: number) => {
  return common.get("/emp", {
    params: { searchKeyword, page, size },
  });
};

const get = (eno: number) => {
  return common.get(`/emp/${eno}`);
};

const insert = (data: IEmp) => {
  return common.post("/emp", data);
};

const update = (eno: number, data: IEmp) => {
  return common.put(`/emp/${eno}`, data);
};

const remove = (eno: number) => {
  return common.delete(`/emp/${eno}`);
};

const EmpService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default EmpService;
