// axios 공통함수 : 벡엔드 연동

import axiosInstance from "../common/axiosInstance";
import type { IEmp } from "../types/IEmp";

const getAll = (searchKeyword: string, page: number, size: number) => {
  return axiosInstance.get("/emp", {
    params: { searchKeyword, page, size },
  });
};

const get = (eno: number) => {
  return axiosInstance.get(`/emp/${eno}`);
};

const insert = (data: IEmp) => {
  return axiosInstance.post("/emp", data);
};

const update = (eno: number, data: IEmp) => {
  return axiosInstance.put(`/emp/${eno}`, data);
};

const remove = (eno: number) => {
  return axiosInstance.delete(`/emp/${eno}`);
};

const EmpService = {
  getAll,
  get,
  insert,
  update,
  remove,
};

export default EmpService;
