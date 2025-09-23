import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import type IEventNotice from "../../types/IEventNotice";
import EventNoticeService from "../../services/EventNoticeService";
import eventNoticeValidation from "../../validation/eventNoticeValidation";
import { Meta } from "react-head";

function AddEventNotice() {
  const nav = useNavigate();

  const save = async (data: IEventNotice) => {
    await EventNoticeService.insert(data);
    alert("저장되었습니다");
    nav("/event-notice");
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      text: "",
      isVisible: "N", // 기본값을 'N'으로 설정
      startDate: null,
      endDate: null,
    },
    validationSchema: eventNoticeValidation,
    onSubmit: (data: IEventNotice) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="공지사항 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공지사항 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* subject 입력 */}
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-1">
            subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject && (
            <div className="text-red-500">{formik.errors.subject}</div>
          )}
        </div>

        {/* text 입력 */}
        <div className="mb-4">
          <label htmlFor="text" className="block mb-1">
            text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="text"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.text && formik.errors.text && (
            <div className="text-red-500">{formik.errors.text}</div>
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
            value={formik.values.startDate ?? ""}
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
            value={formik.values.endDate ?? ""}
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

export default AddEventNotice;
