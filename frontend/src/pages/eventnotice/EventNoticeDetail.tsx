import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type IEventNotice from "../../types/IEventNotice";
import eventNoticeValidation from "../../utils/eventNoticeValidation";
import EventNoticeService from "../../services/EventNoticeService";

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
    try {
      const response = await EventNoticeService.get(eid);
      const { result } = response.data;
      setEventNotice(result); // 서버 데이터 저장
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  // 수정
  const update = async (data: IEventNotice) => {
    try {
      await EventNoticeService.update(eid, data);
      alert("수정되었습니다");
      nav("/event-notice");
    } catch (e) {
      console.error(e);
      alert("오류: " + e);
    }
  };

  // 삭제
  const remove = async () => {
    try {
      await EventNoticeService.remove(eid);
      alert("삭제되었습니다");
      nav("/event-notice");
    } catch (e) {
      console.error(e);
      alert("오류: " + e);
    }
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
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.subject && formik.errors.subject && (
            <div className="text-red-500">{formik.errors.subject}</div>
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
            value={formik.values.startDate??""}
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
            value={formik.values.endDate??""}
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
