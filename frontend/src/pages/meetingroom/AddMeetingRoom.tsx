import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MeetingRoomService from "../../services/MeetingRoomService";

import { Meta } from "react-head";
import messages from "../../common/messages";
import type IMeetingRoom from "../../types/IMeetingRoom";
import meetingRoomValidation from "../../validation/meetingRoomValidation";

function AddMeetingRoom() {
  const nav = useNavigate();

  const save = async (data: IMeetingRoom) => {
    await MeetingRoomService.insert(data);
    alert(messages.save);
    nav("/meeting-room");
  };

  const formik = useFormik({
    initialValues: {
      roomName: "",
      loc: "",
      capacity: 0
    },
    validationSchema: meetingRoomValidation,
    onSubmit: (data: IMeetingRoom) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="부서 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">부서 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* dname 입력 */}
        <div className="mb-4">
          <label htmlFor="roomName" className="block mb-1">
            roomName
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            placeholder="부서"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.roomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.roomName && formik.errors.roomName && (
            <div className="text-red-500">{formik.errors.roomName}</div>
          )}
        </div>

        {/* loc 입력 */}
        <div className="mb-4">
          <label htmlFor="loc" className="block mb-1">
            loc
          </label>
          <input
            type="text"
            id="loc"
            name="loc"
            placeholder="loc"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.loc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.loc && formik.errors.loc && (
            <div className="text-red-500">{formik.errors.loc}</div>
          )}
        </div>
        {/* capacity 입력 */}
        <div className="mb-4">
          <label htmlFor="capacity" className="block mb-1">
            capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="capacity"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.capacity && formik.errors.capacity && (
            <div className="text-red-500">{formik.errors.capacity}</div>
          )}
        </div>
        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          저장
        </button>
      </form>
    </>
  );
}

export default AddMeetingRoom;
