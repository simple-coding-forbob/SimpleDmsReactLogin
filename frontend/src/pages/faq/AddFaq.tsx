import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import faqValidation from "../../validation/faqValidation";
import type IFaq from "../../types/IFaq";
import FaqService from "../../services/FaqService";
import { Meta } from "react-head";

function AddFaq() {
  const nav = useNavigate();

  const save = async (data: IFaq) => {
    await FaqService.insert(data);
    alert("저장되었습니다");
    nav("/faq");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: faqValidation,
    onSubmit: (data: IFaq) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="Faq 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">Faq 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* title 입력 */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* content 입력 */}
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">
            content
          </label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="content"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500">{formik.errors.content}</div>
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

export default AddFaq;
