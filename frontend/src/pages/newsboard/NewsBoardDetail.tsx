import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewsBoardService from "../../services/NewsBoardService";
import type INewsBoard from "../../types/INewsBoard";
import newsBoardValidation from "../../validation/newsBoardValidation";

function NewsBoardDetail() {
  const params = useParams<{ nid: string }>();
  const nid = Number(params.nid);
  const nav = useNavigate();

  const [newsBoard, setNewsBoard] = useState<INewsBoard | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (nid) get(nid);
  }, [nid]);

  const get = async (nid: number) => {
    const response = await NewsBoardService.get(nid);
    const { result } = response.data;
    setNewsBoard(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: INewsBoard) => {
    await NewsBoardService.update(nid, data);
    alert("수정되었습니다");
    nav("/news-board");
  };

  // 삭제
  const remove = async () => {
    await NewsBoardService.remove(nid);
    alert("삭제되었습니다");
    nav("/news-board");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      subject: newsBoard?.subject ?? "",
      text: newsBoard?.text ?? "",
      viewCount: newsBoard?.viewCount ?? "",
      email: newsBoard?.email ?? "",
      name: newsBoard?.name ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: newsBoardValidation,
    onSubmit: (data: INewsBoard) => {
      update(data);
    },
  });

  if (!newsBoard) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">뉴스게시판 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="btextk mb-1">
            subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject && (
            <div className="text-red-500">{formik.errors.subject}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="btextk mb-1">
            text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.text && formik.errors.text && (
            <div className="text-red-500">{formik.errors.text}</div>
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

export default NewsBoardDetail;
