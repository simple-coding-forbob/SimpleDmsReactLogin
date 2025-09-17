import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type IFaq from "../../types/IFaq";
import FaqService from "../../services/FaqService";
import faqValidation from "../../utils/faqValidation";

function FaqDetail() {
  const params = useParams<{ fno: string }>();
  const fno = Number(params.fno);
  const nav = useNavigate();

  const [faq, setFaq] = useState<IFaq|null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (fno) get(fno);
  }, [fno]);

  const get = async (fno: number) => {
    try {
      const response = await FaqService.get(fno);
      const { result } = response.data;
      setFaq(result); // 서버 데이터 저장
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  // 수정
  const update = async (data: IFaq) => {
    try {
      await FaqService.update(fno, data);
      alert("수정되었습니다");
      nav("/faq");
    } catch (e) {
      console.error(e);
      alert("오류: "+e);
    }
  };

  // 삭제
  const remove = async () => {
    try {
      await FaqService.remove(fno);
      alert("삭제되었습니다");
      nav("/faq");
    } catch (e) {
      console.error(e);
      alert("오류: "+e);
    }
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      title: faq?.title ?? "",
      content: faq?.content ?? "",
    },
    enableReinitialize: true,              // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: faqValidation,
    onSubmit: (data: IFaq) => {
      update(data);
    },
  });

  if (!faq) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Faq 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">content</label>
          <input
            type="text"
            id="content"
            name="content"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500">{formik.errors.content}</div>
          )}
        </div>

        <div className="mb-4 flex gap-2">
          <button type="submit" className="flex-1 bg-green-700 text-white p-2 rounded hover:bg-green-800">수정</button>
          <button type="button" onClick={remove} className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700">삭제</button>
        </div>
      </form>
    </>
  );
}

export default FaqDetail;
