import { useFormik } from "formik";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import GalleryService from "../../services/GalleryService";
import type IGallery from "../../types/IGallery";
import galleryValidation from "../../utils/galleryValidation";

function AddGallery() {
  const nav = useNavigate();

  const insert = async (data: IGallery) => {
    try {
      await GalleryService.insert(data);
      alert("저장되었습니다");
      nav("/gallery"); // 업로드 성공 시 강제 이동
    } catch (e) {
      console.error(e);
      alert("오류가 발생했습니다.");
    }
  };

  const formik = useFormik({
    initialValues: {
      galleryTitle: "",
      galleryData: null as File | null,
    },
    validationSchema: galleryValidation,
    onSubmit: (values) => {
      insert(values);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    formik.setFieldValue("galleryData", file);
  };

  return (
    <div className="submit-form">
      <h1 className="text-2xl font-bold mb-6">이미지 업로드</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* 이미지명 */}
        <div className="mb-4">
          <label htmlFor="galleryTitle" className="block mb-1">
            이미지명
          </label>
          <input
            type="text"
            id="galleryTitle"
            name="galleryTitle"
            placeholder="이미지명"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.galleryTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.galleryTitle && formik.errors.galleryTitle && (
            <div className="text-red-500">{formik.errors.galleryTitle}</div>
          )}
        </div>

        {/* 파일 선택 */}
        <div className="mb-4">
          <label className="block mb-1">파일 선택</label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              파일 선택
              <input
                type="file"
                name="galleryData"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span>{formik.values.galleryData?.name ?? "선택된 파일 없음"}</span>
          </div>
          {formik.errors.galleryData && (
            <div className="text-red-500 mt-1">{formik.errors.galleryData}</div>
          )}
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          업로드
        </button>
      </form>
    </div>
  );
}

export default AddGallery;
