import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { useNavigate, useParams } from "react-router-dom";
import messages from "../../common/messages";
import EventNoticeService from "../../services/EventNoticeService";
import type IEventNotice from "../../types/IEventNotice";
import eventNoticeValidation from "../../validation/eventNoticeValidation";

function EventNoticeDetail() {
  const params = useParams<{ eid: string }>();
  const eid = Number(params.eid);
  const nav = useNavigate();

  const [eventNotice, setEventNotice] = useState<IEventNotice | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (eid) get(eid);
  }, [eid]);

  const get = async (eid: number) => {
    const response = await EventNoticeService.get(eid);
    const { result } = response.data;
    setEventNotice(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IEventNotice) => {
    await EventNoticeService.update(eid, data);
    alert(messages.update);
    nav("/event-notice");
  };

  // 삭제
  const remove = async () => {
    await EventNoticeService.remove(eid);
    alert(messages.delete);
    nav("/event-notice");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      subject: eventNotice?.subject ?? "",
      text: eventNotice?.text ?? "",
      isVisible: eventNotice?.isVisible ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: eventNoticeValidation,
    onSubmit: (data: IEventNotice) => {
      update(data);
    },
  });

  if (!eventNotice) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="공지사항 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공지사항 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-1">
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
          <label htmlFor="text" className="block mb-1">
            content
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

export default EventNoticeDetail;
