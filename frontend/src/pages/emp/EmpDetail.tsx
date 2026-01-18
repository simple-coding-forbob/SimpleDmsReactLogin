import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmpService from "../../services/EmpService";

import type {IEmp} from "../../types/IEmp";
import empValidation from "../../validation/empValidation";
import { Meta } from "react-head";

function EmpDetail() {
  const params = useParams<{ eno: string }>();
  const eno = Number(params.eno);
  const nav = useNavigate();

  const [emp, setEmp] = useState<IEmp | null>(null);

  // 상세조회
  useEffect(() => {
    if (eno) get(eno);
  }, [eno]);

  const get = async (eno: number) => {
    const response = await EmpService.get(eno);
    const { result } = response.data;
    setEmp(result);
    console.log(result);
  };

  // 수정
  const update = async (data: IEmp) => {
    await EmpService.update(eno, data);
    alert("수정되었습니다");
    nav("/emp");
  };

  // 삭제
  const remove = async () => {
    await EmpService.remove(eno);
    alert("삭제되었습니다");
    nav("/emp");
  };

  const formik = useFormik({
    initialValues: {
      ename: emp?.ename ?? "",
      job: emp?.job ?? "",
      manager: emp?.manager ?? "",
      hiredate: emp?.hiredate ?? "",
      salary: emp?.salary ?? "",
      commission: emp?.commission ?? "",
      dno: emp?.dno ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: empValidation,
    onSubmit: (data: IEmp) => {
      update(data);
    },
  });

  if (!emp) return <div>로딩중...</div>;

  return (
    <>
      <Meta name="description" content="사원 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">사원 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* ename */}
        <div className="mb-4">
          <label htmlFor="ename" className="block mb-1">
            ename
          </label>
          <input
            type="text"
            id="ename"
            name="ename"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.ename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ename && formik.errors.ename && (
            <div className="text-red-500">{formik.errors.ename}</div>
          )}
        </div>

        {/* job */}
        <div className="mb-4">
          <label htmlFor="job" className="block mb-1">
            job
          </label>
          <input
            type="text"
            id="job"
            name="job"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.job}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.job && formik.errors.job && (
            <div className="text-red-500">{formik.errors.job}</div>
          )}
        </div>

        {/* manager */}
        <div className="mb-4">
          <label htmlFor="manager" className="block mb-1">
            manager
          </label>
          <input
            type="number"
            id="manager"
            name="manager"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.manager}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* hiredate */}
        <div className="mb-4">
          <label htmlFor="hiredate" className="block mb-1">
            hiredate
          </label>
          <input
            type="date"
            id="hiredate"
            name="hiredate"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.hiredate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* salary */}
        <div className="mb-4">
          <label htmlFor="salary" className="block mb-1">
            salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* commission */}
        <div className="mb-4">
          <label htmlFor="commission" className="block mb-1">
            commission
          </label>
          <input
            type="number"
            id="commission"
            name="commission"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.commission ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* dno */}
        <div className="mb-4">
          <label htmlFor="dno" className="block mb-1">
            dno
          </label>
          <input
            type="number"
            id="dno"
            name="dno"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.dno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* 버튼 */}
        <div className="mb-4 flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-green-700 text-white p-2 rounded hover:bg-green-800"
          >
            수정
          </button>
          <button
            type="button"
            onClick={remove}
            className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </form>
    </>
  );
}

export default EmpDetail;
