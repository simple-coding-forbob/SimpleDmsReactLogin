import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import EmpService from "../../services/EmpService";
import type {IEmp} from "../../types/IEmp";
import empValidation from "../../validation/empValidation";
import { Meta } from "react-head";

function AddEmp() {
  const nav = useNavigate();

  const save = async (data: IEmp) => {
    await EmpService.insert(data);
    alert("저장되었습니다");
    nav("/emp");
  };

  const formik = useFormik({
    initialValues: {
      ename: "",
      job: "",
      manager: "",
      hiredate: "",
      salary: "",
      commission: "",
      dno: "",
    },
    validationSchema: empValidation,
    onSubmit: (data: IEmp) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="직원 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6 text-center">직원 추가</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* 이름 */}
        <div>
          <label htmlFor="ename" className="mb-1">
            이름
          </label>
          <input
            type="text"
            id="ename"
            name="ename"
            placeholder="직원 이름"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.ename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ename && formik.errors.ename && (
            <div className="text-red-500">{formik.errors.ename}</div>
          )}
        </div>

        {/* 직무 */}
        <div>
          <label htmlFor="job" className="mb-1">
            직무
          </label>
          <input
            type="text"
            id="job"
            name="job"
            placeholder="직무"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.job}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.job && formik.errors.job && (
            <div className="text-red-500">{formik.errors.job}</div>
          )}
        </div>

        {/* 매니저 */}
        <div>
          <label htmlFor="manager" className="mb-1">
            매니저
          </label>
          <input
            type="number"
            id="manager"
            name="manager"
            placeholder="매니저 사원 번호"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.manager ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.manager && formik.errors.manager && (
            <div className="text-red-500">{formik.errors.manager}</div>
          )}
        </div>

        {/* 입사일 */}
        <div>
          <label htmlFor="hiredate" className="mb-1">
            입사일
          </label>
          <input
            type="date"
            id="hiredate"
            name="hiredate"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.hiredate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hiredate && formik.errors.hiredate && (
            <div className="text-red-500">{formik.errors.hiredate}</div>
          )}
        </div>

        {/* 연봉 */}
        <div>
          <label htmlFor="salary" className="mb-1">
            연봉
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="연봉"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.salary ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.salary && formik.errors.salary && (
            <div className="text-red-500">{formik.errors.salary}</div>
          )}
        </div>

        {/* 커미션 */}
        <div>
          <label htmlFor="commission" className="mb-1">
            커미션
          </label>
          <input
            type="number"
            id="commission"
            name="commission"
            placeholder="커미션"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.commission ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.commission && formik.errors.commission && (
            <div className="text-red-500">{formik.errors.commission}</div>
          )}
        </div>

        {/* 부서 번호 */}
        <div>
          <label htmlFor="dno" className="mb-1">
            부서 번호
          </label>
          <input
            type="number"
            id="dno"
            name="dno"
            placeholder="부서 번호"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.dno ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dno && formik.errors.dno && (
            <div className="text-red-500">{formik.errors.dno}</div>
          )}
        </div>

        {/* Submit 버튼 */}
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

export default AddEmp;
