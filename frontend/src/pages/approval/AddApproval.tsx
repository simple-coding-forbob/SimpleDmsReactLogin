import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import approvalValidation from "../../validation/approvalValidation";
import type IApproval from "../../types/IApproval";
import ApprovalService from "../../services/ApprovalService";
import { Meta } from "react-head";

function AddApproval() {
  const nav = useNavigate();

  const save = async (data: IApproval) => {
    try {
      await ApprovalService.insert(data);
      alert("결재 문서가 저장되었습니다");
      nav("/approval");
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다");
    }
  };

  const formik = useFormik({
    initialValues: {
      uuid: "",
      title: "",
      eno: "",
      seq: ""
    },
    validationSchema: approvalValidation,
    onSubmit: (data: IApproval) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="결재 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">결재 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* uuid 입력 */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="문서명"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* eno 입력 */}
        <div className="mb-4">
          <label htmlFor="eno" className="block mb-1">
            내용
          </label>
          <textarea
            id="eno"
            name="eno"
            placeholder="내용"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.eno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.eno && formik.errors.eno && (
            <div className="text-red-500">{formik.errors.eno}</div>
          )}
        </div>

        {/* seq 입력 */}
        <div className="mb-4">
          <label htmlFor="seq" className="block mb-1">
            작성자
          </label>
          <input
            type="text"
            id="seq"
            name="seq"
            placeholder="작성자"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.seq}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.seq && formik.errors.seq && (
            <div className="text-red-500">{formik.errors.seq}</div>
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

export default AddApproval;
