import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type IQna from "../../types/IQna";
import QnaService from "../../services/QnaService";
import qnaValidation from "../../utils/qnaValidation";

function QnaDetail() {
  const params = useParams<{ qno: string }>();
  const qno = Number(params.qno);
  const nav = useNavigate();

  const [qna, setQna] = useState<IQna | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (qno) get(qno);
  }, [qno]);

  const get = async (qno: number) => {
    try {
      const response = await QnaService.get(qno);
      const { result } = response.data;
      setQna(result); // 서버 데이터 저장
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  // 수정
  const update = async (data: IQna) => {
    try {
      await QnaService.update(qno, data);
      alert("수정되었습니다");
      nav("/qna");
    } catch (e) {
      console.error(e);
      alert("오류: " + e);
    }
  };

  // 삭제
  const remove = async () => {
    try {
      await QnaService.remove(qno);
      alert("삭제되었습니다");
      nav("/qna");
    } catch (e) {
      console.error(e);
      alert("오류: " + e);
    }
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      questioner: qna?.questioner ?? "",
      question: qna?.question ?? "",
      answerer: qna?.answerer ?? "",
      answer: qna?.answer ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: qnaValidation,
    onSubmit: (data: IQna) => {
      update(data);
    },
  });

  if (!qna) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Qna 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="questioner" className="block mb-1">
            questioner
          </label>
          <input
            type="text"
            id="questioner"
            name="questioner"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.questioner}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.questioner && formik.errors.questioner && (
            <div className="text-red-500">{formik.errors.questioner}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.question && formik.errors.question && (
            <div className="text-red-500">{formik.errors.question}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="answerer" className="block mb-1">
            answerer
          </label>
          <input
            type="text"
            id="answerer"
            name="answerer"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.answerer??""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.answerer && formik.errors.answerer && (
            <div className="text-red-500">{formik.errors.answerer}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block mb-1">
            answer
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.answer??""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.answer && formik.errors.answer && (
            <div className="text-red-500">{formik.errors.answer}</div>
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

export default QnaDetail;
