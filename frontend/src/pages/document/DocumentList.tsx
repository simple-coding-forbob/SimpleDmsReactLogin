// DocumentList.tsx
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { Link } from "react-router-dom";
import DocumentService from "../../services/DocumentService";
import type IDocument from "../../types/IDocument";

const DocumentList = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const pageSize = 3; // 고정 페이지 사이즈

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // 검색어 입력
  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setPage(1);
  };

  // 전체 조회
  const selectList = async () => {
    const response = await DocumentService.getAll(
      searchKeyword,
      page - 1,
      pageSize
    );
    const { result, totalNumber } = response.data;
    setDocuments(result);
    setTotalNumber(totalNumber); // rc-pagination total은 전체 아이템 수
  };

  // pdf 다운로드 함수
  const viewPdf = async (docId: number) => {
    const response = await DocumentService.viewPdf(docId);
    // 응답 데이터를 Blob으로 변환
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // 새 탭에서 열기
    window.open(url, "_blank");

    // 메모리 정리
    window.URL.revokeObjectURL(url);
  };

  // 삭제
  const remove = async (docId: number) => {
    await DocumentService.remove(docId);
    alert("삭제되었습니다");
    selectList();
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <Meta name="description" content="Document 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-4">Document 조회</h1>

      {/* 검색 */}
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Search by title"
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

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((data) => (
          <div
            key={data.docId}
            className="border rounded shadow hover:shadow-md overflow-hidden"
          >
            <div className="p-4">
              <button
                className="font-bold text-lg text-blue-600 hover:underline"
                onClick={() => viewPdf(data.docId!)}
              >
                {data.title}
              </button>
              <p className="text-gray-600">{data.content}</p>
              <p className="text-sm text-gray-400">
                작성자 사원번호: {data.drafter}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="px-2 py-1 bg-red-600 rounded text-white"
                  onClick={() => remove(data.docId!)}
                >
                  삭제
                </button>
                <Link
                  to={"/add-approval/" + data.docId}
                  className="px-2 py-1 bg-green-600 rounded text-white"
                >
                  결재
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={totalNumber}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DocumentList;
