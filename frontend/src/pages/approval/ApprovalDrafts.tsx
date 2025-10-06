import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { Link } from "react-router-dom";
import ApprovalService from "../../services/ApprovalService";
import type IApproval from "../../types/IApproval";

const ApprovalDrafts = () => {
  const [approvals, setApprovals] = useState<IApproval[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const size = 5; // 페이지당 문서 수

  const handlePageChange = (page: number) => {
    setPage(page);
    console.log("현재 페이지:", page);
  };

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setPage(1);
  };

  const selectList = async () => {
    const response = await ApprovalService.getAllDrafts(searchKeyword, page - 1, size);
    const { result, totalNumber } = response.data;
    setApprovals(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <Meta name="description" content="전자결재 문서 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">전자결재 문서 조회</h1>

      {/* 검색 영역 */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="제목 검색"
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
        />
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-r min-w-[5rem]"
          onClick={selectList}
        >
          검색
        </button>
      </div>

      {/* 목록 테이블 */}
      <div>
        <table className="w-[100%] border border-gray-200">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 border-b">제목</th>
              <th className="px-4 py-2 border-b">결재자 사번</th>
              <th className="px-4 py-2 border-b">결재 순번</th>
              <th className="px-4 py-2 border-b">상태</th>
              <th className="px-4 py-2 border-b">결재시간</th>
              <th className="px-4 py-2 border-b">비고</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((data) => (
              <tr key={data.aid} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">
                  <Link to={`/approval-detail/${data.docId}`}>{data.title}</Link>
                </td>
                <td className="px-4 py-2 border-b text-center">{data.approver}</td>
                <td className="px-4 py-2 border-b text-center">{data.seq}</td>
                <td className="px-4 py-2 border-b text-center">{data.status}</td>
                <td className="px-4 py-2 border-b text-center">{data.approveTime}</td>
                <td className="px-4 py-2 border-b text-center">{data.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이징 */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={page}
          total={totalNumber}
          pageSize={size}
          onChange={handlePageChange}
          className="flex space-x-2"
        />
      </div>
    </>
  );
};

export default ApprovalDrafts;
