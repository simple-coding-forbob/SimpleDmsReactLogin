import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import NewsBoardService from "../../services/NewsBoardService";
import type INewsBoard from "../../types/INewsBoard";
import newsBoardValidation from "../../validation/newsBoardValidation";

function AddNewsBoard() {
  const nav = useNavigate();

  const save = async (data: INewsBoard) => {
    await NewsBoardService.insert(data);
    alert("저장되었습니다");
    nav("/news-board");
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      text: "",
      viewCount: 0,
      email: "",
      name: "",
    },
    validationSchema: newsBoardValidation,
    onSubmit: (data: INewsBoard) => {
      save(data);
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">뉴스 게시판 추가</h1>

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

export default AddNewsBoard;
