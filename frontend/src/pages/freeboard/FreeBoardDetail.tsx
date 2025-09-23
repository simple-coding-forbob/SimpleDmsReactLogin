import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FreeBoardService from "../../services/FreeBoardService";
import type IFreeBoard from "../../types/IFreeBoard";
import freeBoardValidation from "../../validation/freeBoardValidation";
import { Meta } from "react-head";

function FreeBoardDetail() {
  const params = useParams<{ fid: string }>();
  const fid = Number(params.fid);
  const nav = useNavigate();

  const [freeBoard, setFreeBoard] = useState<IFreeBoard | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (fid) get(fid);
  }, [fid]);

  const get = async (fid: number) => {
    const response = await FreeBoardService.get(fid);
    const { result } = response.data;
    setFreeBoard(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IFreeBoard) => {
    await FreeBoardService.update(fid, data);
    alert("수정되었습니다");
    nav("/free-board");
  };

  // 삭제
  const remove = async () => {
    await FreeBoardService.remove(fid);
    alert("삭제되었습니다");
    nav("/free-board");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      title: freeBoard?.title ?? "",
      content: freeBoard?.content ?? "",
      viewCount: freeBoard?.viewCount ?? "",
      email: freeBoard?.email ?? "",
      name: freeBoard?.name ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: freeBoardValidation,
    onSubmit: (data: IFreeBoard) => {
      update(data);
    },
  });

  if (!freeBoard) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="자유 게시판 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">자유게시판 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="bcontentk mb-1">
            title
          </label>
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
          <label htmlFor="content" className="bcontentk mb-1">
            content
          </label>
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

export default FreeBoardDetail;
