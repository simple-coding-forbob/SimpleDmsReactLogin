import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { useNavigate } from "react-router-dom";
import BookingService from "../../services/BookingService";

import PublicCarService from "../../services/PublicCarService";
import type IBooking from "../../types/IBooking";
import type IPublicCar from "../../types/IPublicCar";
import bookingValidation from "../../validation/bookingValidation";

function AddBooking() {
  const nav = useNavigate();

  const [meetingRooms, setPublicCars] = useState<IPublicCar[]>([]); // null로 초기화 -> 로딩 상태 판단

    // 회의실 전체조회
  useEffect(() => {
    findAll();
  }, []);

  const findAll = async () => {
    const response = await PublicCarService.findAll();
    const { result } = response.data;
    setPublicCars(result);
    console.log(response.data);
  };

  const save = async (data: IBooking) => {
    await BookingService.insert(data);
    alert("저장되었습니다");
    nav("/booking");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      pid:"",
      carName: "",
      startTime: "",
      endTime: "",                  
    },
    validationSchema: bookingValidation,
    onSubmit: (data: IBooking) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="예약 게시판 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">예약 게시판 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* pid 선택 */}
        <div className="mb-4">
          <label htmlFor="carName" className="block mb-1">
            carName
          </label>
          <select
            id="pid"
            name="pid"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.pid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">선택해주세요</option>
            {meetingRooms.map((room) => (
              <option key={room.pid} value={room.pid}>
                {room.carName}
              </option>
            ))}
          </select>
          {formik.touched.pid && formik.errors.pid && (
            <div className="text-red-500">{formik.errors.pid}</div>
          )}
        </div>
        {/* startTime 입력 */}
        <div className="mb-4">
          <label htmlFor="startTime" className="block mb-1">
            startTime
          </label>
          <input
            type="datetime-local"
            step="3600"
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
        {/* endTime 입력 */}
        <div className="mb-4">
          <label htmlFor="endTime" className="block mb-1">
            endTime
          </label>
          <input
            type="datetime-local"
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

export default AddBooking;
