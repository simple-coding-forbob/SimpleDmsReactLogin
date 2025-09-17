// axios 공통함수 : 벡엔드 연동

import type IApiResponse from "../types/IApiResponse";
import type IEmp from "../types/IEmp";
import common from "./CommonService";

const getAll = (searchKeyword:string, page:number, size:number) => {
  return common.get<IApiResponse<IEmp[]>>(`/emp?searchKeyword=${searchKeyword}&page=${page}&size=${size}`);
};

const get = (eno:number | null) => {
  return common.get<IApiResponse<IEmp>>(`/emp/${eno}`);
};

const insert = (data:IEmp) => {
  return common.post("/emp", data);
};

const update = (eno:number | null, data:IEmp) => {
  return common.put(`/emp/${eno}`, data);
};

const remove = (eno:number | null) => {
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
