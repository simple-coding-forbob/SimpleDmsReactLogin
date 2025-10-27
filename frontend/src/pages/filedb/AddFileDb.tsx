import { useFormik } from "formik";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import FileDbService from "../../services/FileDbService";

import { Meta } from "react-head";
import messages from "../../common/messages";
import type {IFileDb} from "../../types/IFileDb";
import fileDbValidation from "../../validation/fileDbValidation";

function AddFileDb() {
  const nav = useNavigate();

  const insert = async (data: IFileDb) => {
    await FileDbService.insert(data);
    alert(messages.save);
    nav("/fileDb"); // 업로드 성공 시 강제 이동
  };

  const formik = useFormik({
    initialValues: {
      fileTitle: "",
      fileContent: "",
      fileData: null as File | null,
    },
    validationSchema: fileDbValidation,
    onSubmit: (values) => {
      insert(values);
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    formik.setFieldValue("fileData", file);
  };

  return (
    <>
      <Meta name="description" content="이미지 업로드 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">이미지 업로드</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* 이미지명 */}
        <div className="mb-4">
          <label htmlFor="fileTitle" className="block mb-1">
            이미지명
          </label>
          <input
            type="text"
            id="fileTitle"
            name="fileTitle"
            placeholder="이미지명"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.fileTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fileTitle && formik.errors.fileTitle && (
            <div className="text-red-500">{formik.errors.fileTitle}</div>
          )}
        </div>

        {/* 이미지내용 */}
        <div className="mb-4">
          <label htmlFor="fileContent" className="block mb-1">
            내용
          </label>
          <input
            type="text"
            id="fileContent"
            name="fileContent"
            placeholder="내용"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.fileContent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fileContent && formik.errors.fileContent && (
            <div className="text-red-500">{formik.errors.fileContent}</div>
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
                name="fileData"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span>{formik.values.fileData?.name ?? "선택된 파일 없음"}</span>
          </div>
          {formik.errors.fileData && (
            <div className="text-red-500 mt-1">{formik.errors.fileData}</div>
          )}
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          업로드
        </button>
      </form>
    </>
  );
}

export default AddFileDb;
