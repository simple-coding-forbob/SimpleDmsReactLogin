import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import approvalValidation from "../../validation/approvalValidation";
import type IApproval from "../../types/IApproval";
import ApprovalService from "../../services/ApprovalService";
import { Meta } from "react-head";
import { useEffect, useState } from "react";
import DocumentService from "../../services/DocumentService";
import type IDocument from "../../types/IDocument";
import messages from "../../common/messages";

function AddApproval() {
  const params = useParams<{ uuid: string }>();
  const uuid=params.uuid;
  // TODO: 에러 처리
  if(!uuid)  throw new Error(messages.uuidNotFound);

  const nav = useNavigate();

  const [document, setDocument] = useState<IDocument | null>(null);

  // 상세조회
  useEffect(() => {
    if (uuid) get();
  }, [uuid]);

  const get = async () => {
    const response = await DocumentService.get(uuid);
    const { result } = response.data;
    setDocument(result);
    console.log(result);
  };

  const save = async (data: IApproval) => {
    try {
      await ApprovalService.insert(data);
      alert(messages.save);
      nav("/approval-drafts");
    } catch (error) {
      console.error(error);
      alert(messages.contactAdmin);
    }
  };

  const formik = useFormik({
    initialValues: {
      uuid: document?.uuid?? "",
      title: document?.title?? "",
      approver: "",
      seq: "",
    },
    enableReinitialize: true,
    validationSchema: approvalValidation,
    onSubmit: (data: IApproval) => {
      save(data);
    },
  });

  return (
    <>
      <Meta name="description" content="결재 추가 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">결재 추가</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* title 입력 */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1">
            결제 문서
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="문서명"
            readOnly
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500">{formik.errors.title}</div>
          )}
        </div>

        {/* eno 입력 */}
        <div className="mb-4">
          <label htmlFor="approver" className="block mb-1">
            결재자 사원번호
          </label>
          <textarea
            id="approver"
            name="approver"
            placeholder="결재자 사원번호"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.approver}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.approver && formik.errors.approver && (
            <div className="text-red-500">{formik.errors.approver}</div>
          )}
        </div>

        {/* seq 입력 */}
        <div className="mb-4">
          <label htmlFor="seq" className="block mb-1">
            결재 순서
          </label>
          <input
            type="text"
            id="seq"
            name="seq"
            placeholder="결재 순서"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={formik.values.seq}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.seq && formik.errors.seq && (
            <div className="text-red-500">{formik.errors.seq}</div>
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

export default AddApproval;
