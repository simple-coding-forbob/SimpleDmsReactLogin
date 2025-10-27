import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeptService from "../../services/DeptService";

import type {IDept} from "../../types/IDept";
import deptValidation from "../../validation/deptValidation";
import { Meta } from "react-head";

function DeptDetail() {
  const params = useParams<{ dno: string }>();
  const dno = Number(params.dno);
  const nav = useNavigate();

  const [dept, setDept] = useState<IDept | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (dno) get(dno);
  }, [dno]);

  const get = async (dno: number) => {
    const response = await DeptService.get(dno);
    const { result } = response.data;
    setDept(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IDept) => {
    await DeptService.update(dno, data);
    alert("수정되었습니다");
    nav("/dept");
  };

  // 삭제
  const remove = async () => {
    await DeptService.remove(dno);
    alert("삭제되었습니다");
    nav("/dept");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      dname: dept?.dname ?? "",
      loc: dept?.loc ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: deptValidation,
    onSubmit: (data: IDept) => {
      update(data);
    },
  });

  if (!dept) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="부서 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">부서 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dname" className="block mb-1">
            dname
          </label>
          <input
            type="text"
            id="dname"
            name="dname"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.dname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dname && formik.errors.dname && (
            <div className="text-red-500">{formik.errors.dname}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="loc" className="block mb-1">
            loc
          </label>
          <input
            type="text"
            id="loc"
            name="loc"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.loc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.loc && formik.errors.loc && (
            <div className="text-red-500">{formik.errors.loc}</div>
          )}
        </div>

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

export default DeptDetail;
