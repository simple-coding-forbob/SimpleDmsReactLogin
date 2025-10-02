// DocumentList.tsx
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import DocumentService from "../../services/DocumentService";
import type IDocument from "../../types/IDocument";
import { Link } from "react-router-dom";

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
    try {
      const response = await DocumentService.getAll(
        searchKeyword,
        page - 1,
        pageSize
      );
      const { result, totalNumber } = response.data;
      setDocuments(result);
      setTotalNumber(totalNumber); // rc-pagination total은 전체 아이템 수
    } catch (error) {
      console.error(error);
    }
  };

  // 삭제
  const remove = async (docId: string) => {
    try {
      await DocumentService.remove(docId);
      alert("삭제되었습니다");
      selectList();
    } catch (error) {
      console.error(error);
    }
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
        {documents.map((doc) => (
          <div
            key={doc.docId}
            className="border rounded shadow hover:shadow-md overflow-hidden"
          >
            <div className="p-4">
              <a
                href={"/document/pdf/"+doc.docId} // 백엔드 다운로드 URL
                className="font-bold text-lg text-blue-600 hover:underline"
                download // 브라우저가 파일 다운로드 처리(새로 고침 없음)
              >
                {doc.title}
              </a>
              <p className="text-gray-600">{doc.content}</p>
              <p className="text-sm text-gray-400">
                작성자 사원번호: {doc.drafter}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="px-2 py-1 bg-red-600 rounded text-white"
                  onClick={() => remove(doc.docId!)}
                >
                  삭제
                </button>
                <Link
                  to={"/add-approval/"+ doc.docId}
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
