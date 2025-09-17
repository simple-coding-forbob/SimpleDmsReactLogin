import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import faqValidation from "../../utils/faqValidation";
import type IFaq from "../../types/IFaq";
import FaqService from "../../services/FaqService";

function AddFaq() {
  const nav = useNavigate();

  const save = async (data: IFaq) => {
    try {
      await FaqService.insert(data);
      alert("저장되었습니다");
      nav("/faq");
    } catch (e) {
      console.error(e);
      alert("오류 :"+e);
    }
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          저장
        </button>
      </form>
    </>
  );
}

export default AddFaq;
