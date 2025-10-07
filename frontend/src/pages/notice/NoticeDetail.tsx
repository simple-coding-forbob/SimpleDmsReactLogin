import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { useNavigate, useParams } from "react-router-dom";
import messages from "../../common/messages";
import NoticeService from "../../services/NoticeService";
import type INotice from "../../types/INotice";
import noticeValidation from "../../validation/noticeValidation";

function NoticeDetail() {
  const params = useParams<{ nid: string }>();
  const nid = Number(params.nid);
  const nav = useNavigate();

  const [notice, setNotice] = useState<INotice | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (nid) get(nid);
  }, [nid]);

  const get = async (nid: number) => {
    const response = await NoticeService.get(nid);
    const { result } = response.data;
    setNotice(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: INotice) => {
    await NoticeService.update(nid, data);
    alert(messages.update);
    nav("/notice");
  };

  // 삭제
  const remove = async () => {
    await NoticeService.remove(nid);
    alert(messages.delete);
    nav("/notice");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      title: notice?.title ?? "",
      content: notice?.content ?? "",
      isVisible: notice?.isVisible ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: noticeValidation,
    onSubmit: (data: INotice) => {
      update(data);
    },
  });

  if (!notice) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="공지사항 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공지사항 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
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
          <label htmlFor="content" className="block mb-1">
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

        {/* startDate */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-1">
            hiredate
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* endDate */}
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-1">
            hiredate
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="w-full border border-gray-300 rounded p-2"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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

export default NoticeDetail;
