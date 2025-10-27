import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import DeptService from "../../services/DeptService";

import { Meta } from "react-head";
import type {IDept} from "../../types/IDept";
import deptValidation from "../../validation/deptValidation";

function AddDept() {
  const nav = useNavigate();

  const save = async (data: IDept) => {
    await DeptService.insert(data);
    alert("저장되었습니다");
    nav("/dept");
  };

  const formik = useFormik({
    initialValues: {
      dname: "",
      loc: "",
    },
    validationSchema: deptValidation,
    onSubmit: (data: IDept) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="부서 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">부서 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* dname 입력 */}
        <div className="mb-4">
          <label htmlFor="dname" className="block mb-1">
            dname
          </label>
          <input
            type="text"
            id="dname"
            name="dname"
            placeholder="부서"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.dname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dname && formik.errors.dname && (
            <div className="text-red-500">{formik.errors.dname}</div>
          )} 
        </div>

        {/* loc 입력 */}
        <div className="mb-4">
          <label htmlFor="loc" className="block mb-1">
            loc
          </label>
          <input
            type="text"
            id="loc"
            name="loc"
            placeholder="loc"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.loc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.loc && formik.errors.loc && (
            <div className="text-red-500">{formik.errors.loc}</div>
          )}
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          저장
        </button>
      </form>
    </>
  );
}

export default AddDept;
