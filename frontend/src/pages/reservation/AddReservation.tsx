import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Meta } from "react-head";
import type IReservation from "../../types/IReservation";
import ReservationService from "../../services/ReservationService";
import reservationValidation from "../../validation/reservationValidation";

function AddReservation() {
  const nav = useNavigate();

  const save = async (data: IReservation) => {
    await ReservationService.insert(data);
    alert("저장되었습니다");
    nav("/reservation");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      roomName: "",
      startTime: "",
      endTime: "",
      status: "",
    },
    validationSchema: reservationValidation,
    onSubmit: (data: IReservation) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="예약 게시판 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">예약 게시판 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* email 입력 */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
        </div>
        {/* roomName 입력 */}
        <div className="mb-4">
          <label htmlFor="roomName" className="block mb-1">
            roomName
          </label>
          <select
            id="roomName"
            name="roomName"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.roomName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">선택하세요</option>
            {meetingRooms.map((room) => (
              <option key={room.mid} value={room.roomName}>
                {room.roomName}
              </option>
            ))}
          </select>
          {formik.touched.roomName && formik.errors.roomName && (
            <div className="text-red-500">{formik.errors.roomName}</div>
          )}
        </div>
        {/* startTime 입력 */}
        <div className="mb-4">
          <label htmlFor="startTime" className="block mb-1">
            text
          </label>
          <input
            type="date"
            id="startTime"
            name="startTime"
            placeholder="startTime"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <div className="text-red-500">{formik.errors.startTime}</div>
          )}
        </div>
        {/* text 입력 */}
        <div className="mb-4">
          <label htmlFor="endTime" className="block mb-1">
            text
          </label>
          <input
            type="date"
            id="endTime"
            name="endTime"
            placeholder="endTime"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.endTime && formik.errors.endTime && (
            <div className="text-red-500">{formik.errors.endTime}</div>
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

export default AddReservation;
