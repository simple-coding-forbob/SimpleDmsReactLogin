// AddDocument.tsx
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import DocumentService from "../../services/DocumentService";

import { useEffect, useState } from "react";
import { Meta } from "react-head";
import TemplateService from "../../services/TemplateService";
import type IDocument from "../../types/IDocument";
import type ITemplate from "../../types/ITemplate";
import documentValidation from "../../validation/documentValidation";

function AddDocument() {
  const nav = useNavigate();

  const [templates, setTemplates] = useState<ITemplate[]>([]); // null로 초기화 -> 로딩 상태 판단

  // 회의실 전체조회
  useEffect(() => {
    selectAll();
  }, []);

  const selectAll = async () => {
    const response = await TemplateService.selectAll();
    const { result } = response.data;
    setTemplates(result);
    console.log(response.data);
  };

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
      tid: "",
    },
    validationSchema: documentValidation,
    onSubmit: (values) => {
      insert(values);
    },
  });

  return (
    <>
      <Meta name="description" content="기안서 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">Document 추가</h1>

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
            요청 내용
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="문서 내용"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={10} // 원하는 높이 조절
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500">{formik.errors.content}</div>
          )}
        </div>

        {/* 템플릿 파일 목록 선택 */}
        <div className="mb-4">
          <label htmlFor="tid" className="block mb-1">
            템플릿 파일
          </label>
          <select
            id="tid"
            name="tid"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.tid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">선택해주세요</option>
            {templates.map((data) => (
              <option key={data.tid} value={data.tid}>
                {data.title}
              </option>
            ))}
          </select>
          {formik.touched.tid && formik.errors.tid && (
            <div className="text-red-500">{formik.errors.tid}</div>
          )}
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          추가
        </button>
      </form>
    </>
  );
}

export default AddDocument;
