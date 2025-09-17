import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import type IQna from "../../types/IQna";
import QnaService from "../../services/QnaService";
import qnaValidation from "../../utils/qnaValidation";

function AddQna() {
  const nav = useNavigate();

  const save = async (data: IQna) => {
    try {
      await QnaService.insert(data);
      alert("저장되었습니다");
      nav("/qna");
    } catch (e) {
      console.error(e);
      alert("오류 :" + e);
    }
  };

  const formik = useFormik({
    initialValues: {
      questioner: "",
      question: "",
      answerer: "",
      answer: "",
    },
    validationSchema: qnaValidation,
    onSubmit: (data: IQna) => {
      save(data);
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Qna 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* questioner 입력 */}
        <div className="mb-4">
          <label htmlFor="questioner" className="block mb-1">
            questioner
          </label>
          <input
            type="text"
            id="questioner"
            name="questioner"
            placeholder="제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.questioner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.questioner && formik.errors.questioner && (
            <div className="text-red-500">{formik.errors.questioner}</div>
          )}
        </div>
        {/* question 입력 */}
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            questioner
          </label>
          <input
            type="text"
            id="question"
            name="question"
            placeholder="제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.question && formik.errors.question && (
            <div className="text-red-500">{formik.errors.question}</div>
          )}
        </div>

        {/* answerer 입력 */}
        <div className="mb-4">
          <label htmlFor="answerer" className="block mb-1">
            answerer
          </label>
          <input
            type="text"
            id="answerer"
            name="answerer"
            placeholder="answerer"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.answerer?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.answerer && formik.errors.answerer && (
            <div className="text-red-500">{formik.errors.answerer}</div>
          )}
        </div>
        {/* answer 입력 */}
        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1">
            question
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            placeholder="answer"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.answer?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.answer && formik.errors.answer && (
            <div className="text-red-500">{formik.errors.answer}</div>
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

export default AddQna;
