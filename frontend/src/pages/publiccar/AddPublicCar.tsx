import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import PublicCarService from "../../services/PublicCarService";

import { Meta } from "react-head";
import messages from "../../common/messages";
import type IPublicCar from "../../types/IPublicCar";
import publicCarValidation from "../../validation/publicCarValidation";

function AddPublicCar() {
  const nav = useNavigate();

  const save = async (data: IPublicCar) => {
    await PublicCarService.insert(data);
    alert(messages.save);
    nav("/public-car");
  };

  const formik = useFormik({
    initialValues: {
      carName: "",
      floor: "",
      capacity: 0
    },
    validationSchema: publicCarValidation,
    onSubmit: (data: IPublicCar) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="공용차 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">공용차 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* dname 입력 */}
        <div className="mb-4">
          <label htmlFor="carName" className="block mb-1">
            carName
          </label>
          <input
            type="text"
            id="carName"
            name="carName"
            placeholder="부서"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.carName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.carName && formik.errors.carName && (
            <div className="text-red-500">{formik.errors.carName}</div>
          )}
        </div>

        {/* loc 입력 */}
        <div className="mb-4">
          <label htmlFor="floor" className="block mb-1">
            loc
          </label>
          <input
            type="text"
            id="floor"
            name="floor"
            placeholder="floor"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.floor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.floor && formik.errors.floor && (
            <div className="text-red-500">{formik.errors.floor}</div>
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

export default AddPublicCar;
