import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { useNavigate, useParams } from "react-router-dom";
import BookingService from "../../services/BookingService";
import PublicCarService from "../../services/PublicCarService";
import type IBooking from "../../types/IBooking";
import type IBookingStatus from "../../types/IBookingStatus";
import type IPublicCar from "../../types/IPublicCar";
import bookingValidation from "../../validation/bookingValidation";

function BookingDetail() {
  const params = useParams<{ rid: string }>();
  const rid = Number(params.rid);
  const nav = useNavigate();

  const [publicCars, setPublicCars] = useState<IPublicCar[]>([]); // null로 초기화 -> 로딩 상태 판단
  const [bookingStatus, setBookingStatus] = useState<IBookingStatus[]>([]); // null로 초기화 -> 로딩 상태 판단
  const [booking, setBooking] = useState<IBooking | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 회의실 전체조회
  useEffect(() => {
    findAll();
    getStatusAll();
  }, []);

  // 상세조회
  useEffect(() => {
    if (rid) get(rid);
  }, [rid]);

  const getStatusAll = async () => {
    const response = await BookingService.getStatusAll();
    const { result } = response.data;
    setBookingStatus(result);
    console.log(response.data);
  };

  const findAll = async () => {
    const response = await PublicCarService.findAll();
    const { result } = response.data;
    setPublicCars(result);
    console.log(response.data);
  };

  const get = async (rid: number) => {
    const response = await BookingService.get(rid);
    const { result } = response.data;
    setBooking(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IBooking) => {
    await BookingService.update(rid, data);
    alert("수정되었습니다");
    nav("/booking");
  };

  // 삭제
  const remove = async () => {
    await BookingService.remove(rid);
    alert("삭제되었습니다");
    nav("/booking");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      email: booking?.email ?? "",
      pid: booking?.pid ?? "",
      carName: booking?.carName ?? "",
      startTime: booking?.startTime ?? "",
      endTime: booking?.endTime ?? "",
      status: booking?.status ?? "",
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: bookingValidation,
    onSubmit: (data: IBooking) => {
      update(data);
    },
  });

  if (!booking) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="예약 게시판 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">예약게시판 상세조회</h1>

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
            {publicCars.map((data) => (
              <option key={data.pid} value={data.pid}>
                {data.carName}
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

        {/* bookingStatus 선택 */}
        <div className="mb-4">
          <label htmlFor="status" className="block mb-1">
            bookingStatus
          </label>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {bookingStatus.map((data) => (
              <option key={data.name} value={data.name}>
                {data.description}
              </option>
            ))}
          </select>
          {formik.touched.status && formik.errors.status && (
            <div className="text-red-500">{formik.errors.status}</div>
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

export default BookingDetail;
