import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicCarService from "../../services/PublicCarService";

import { Meta } from "react-head";
import messages from "../../common/messages";
import type IPublicCar from "../../types/IPublicCar";
import publicCarValidation from "../../validation/publicCarValidation";

function PublicCarDetail() {
  const params = useParams<{ pid: string }>();
  const pid = Number(params.pid);
  const nav = useNavigate();

  const [publicCar, setPublicCar] = useState<IPublicCar | null>(null); // null로 초기화 -> 로딩 상태 판단

  // 상세조회
  useEffect(() => {
    if (pid) get(pid);
  }, [pid]);

  const get = async (pid: number) => {
    const response = await PublicCarService.get(pid);
    const { result } = response.data;
    setPublicCar(result); // 서버 데이터 저장
    console.log(result);
  };

  // 수정
  const update = async (data: IPublicCar) => {
    await PublicCarService.update(pid, data);
    alert(messages.update);
    nav("/public-car");
  };

  // 삭제
  const remove = async () => {
    await PublicCarService.remove(pid);
    alert(messages.delete);
    nav("/public-car");
  };

  // 서버 데이터가 준비되었을 때만 Formik 초기화
  const formik = useFormik({
    initialValues: {
      carName: publicCar?.carName ?? "",
      floor: publicCar?.floor ?? "",
      capacity: publicCar?.capacity ?? 0,
    },
    enableReinitialize: true, // 값이 바뀌면 재갱신: 최초 null -> 서버데이터
    validationSchema: publicCarValidation,
    onSubmit: (data: IPublicCar) => {
      update(data);
    },
  });

  if (!publicCar) return <div>로딩중...</div>; // 데이터 로딩 중 표시

  return (
    <>
      <Meta name="description" content="공용차 상세조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공용차 상세조회</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="carName" className="block mb-1">
            carName
          </label>
          <input
            type="text"
            id="carName"
            name="carName"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.carName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.carName && formik.errors.carName && (
            <div className="text-red-500">{formik.errors.carName}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="floor" className="block mb-1">
            floor
          </label>
          <input
            type="text"
            id="floor"
            name="floor"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.floor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.floor && formik.errors.floor && (
            <div className="text-red-500">{formik.errors.floor}</div>
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

export default PublicCarDetail;
