// AddDocument.tsx
import { useFormik } from "formik";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DocumentService from "../../services/DocumentService";

import { Meta } from "react-head";
import type IDocument from "../../types/IDocument";
import documentValidation from "../../validation/documentValidation";

function AddDocument() {
  const nav = useNavigate();

  const insert = async (data: IDocument) => {
    try {
      await DocumentService.insert(data);
      alert("문서가 저장되었습니다");
      nav("/document"); // 저장 후 목록 페이지 이동
    } catch (error) {
      console.error(error);
      alert("문서 저장 중 오류가 발생했습니다");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      fileData: null as File | null,
    },
    validationSchema: documentValidation,
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
      <Meta name="description" content="문서 업로드 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">문서 업로드</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* 문서 제목 */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="문서 제목"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* 문서 내용 */}
        <div className="mb-4">
          <label htmlFor="content" className="block mb-1">
            내용
          </label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="문서 내용"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500">{formik.errors.content}</div>
          )}
        </div>

        {/* 파일 선택 */}
        <div className="mb-4">
          <label className="block mb-1">첨부파일</label>
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

export default AddDocument;
