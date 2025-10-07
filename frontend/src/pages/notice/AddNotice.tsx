import { useFormik } from "formik";
import { Meta } from "react-head";
import { useNavigate } from "react-router-dom";
import messages from "../../common/messages";
import NoticeService from "../../services/NoticeService";
import type INotice from "../../types/INotice";
import noticeValidation from "../../validation/noticeValidation";

function AddNotice() {
  const nav = useNavigate();

  const save = async (data: INotice) => {
    await NoticeService.insert(data);
    alert(messages.save);
    nav("/notice");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      isVisible: "N", // 기본값을 'N'으로 설정
      startDate: "",
      endDate: "",
    },
    validationSchema: noticeValidation,
    onSubmit: (data: INotice) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="공지사항 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공지사항 추가</h1>

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
        {/* isVisible 입력 - SelectBox */}
        <div className="mb-4">
          <label htmlFor="isVisible" className="block mb-1">
            표시 여부
          </label>
          <select
            id="isVisible"
            name="isVisible"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.isVisible || "N"} // 초기값 N
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="Y">Y</option>
            <option value="N">N</option>
          </select>
          {formik.touched.isVisible && formik.errors.isVisible && (
            <div className="text-red-500">{formik.errors.isVisible}</div>
          )}
        </div>

        {/* 시작일 */}
        <div className="mb-4">
          <label htmlFor="startDate" className="mb-1">
            시작일
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className="text-red-500">{formik.errors.startDate}</div>
          )}
        </div>

        {/* 종료일 */}
        <div className="mb-4">
          <label htmlFor="endDate" className="mb-1">
            시작일
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className="text-red-500">{formik.errors.endDate}</div>
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

export default AddNotice;
