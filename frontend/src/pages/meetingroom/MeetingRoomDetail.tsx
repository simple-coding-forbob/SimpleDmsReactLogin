import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MeetingRoomService from "../../services/MeetingRoomService";

import { Meta } from "react-head";
import messages from "../../common/messages";
import type IMeetingRoom from "../../types/IMeetingRoom";
import meetingRoomValidation from "../../validation/meetingRoomValidation";

function MeetingRoomDetail() {
  const params = useParams<{ mid: string }>();
  const mid = Number(params.mid);
  const nav = useNavigate();

  const [meetingRoom, setMeetingRoom] = useState<IMeetingRoom | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (mid) get(mid);
  }, [mid]);

  const get = async (mid: number) => {
    const response = await MeetingRoomService.get(mid);
    const { result } = response.data;
    setMeetingRoom(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IMeetingRoom) => {
    await MeetingRoomService.update(mid, data);
    alert(messages.update);
    nav("/meeting-room");
  };

  // 삭제
  const remove = async () => {
    await MeetingRoomService.remove(mid);
    alert(messages.delete);
    nav("/meeting-room");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      roomName: meetingRoom?.roomName ?? "",
      loc: meetingRoom?.loc ?? "",
      capacity: meetingRoom?.capacity ?? 0,
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: meetingRoomValidation,
    onSubmit: (data: IMeetingRoom) => {
      update(data);
    },
  });

  if (!meetingRoom) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="회의실 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">회의실 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="roomName" className="block mb-1">
            roomName
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.roomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomName && formik.errors.roomName && (
            <div className="text-red-500">{formik.errors.roomName}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="loc" className="block mb-1">
            loc
          </label>
          <input
            type="text"
            id="loc"
            name="loc"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.loc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.loc && formik.errors.loc && (
            <div className="text-red-500">{formik.errors.loc}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="capacity" className="block mb-1">
            capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.capacity && formik.errors.capacity && (
            <div className="text-red-500">{formik.errors.capacity}</div>
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

export default MeetingRoomDetail;
