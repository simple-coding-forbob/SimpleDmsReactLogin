// FiledbList.tsx
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import messages from "../../common/messages";
import FileDbService from "../../services/FileDbService";
import type {IFileDb} from "../../types/IFileDb";

const FiledbList = () => {
  const [fileDbs, setFileDbs] = useState<IFileDb[]>([]);
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
    const response = await FileDbService.getAll(
      searchKeyword,
      page - 1,
      pageSize
    );
    const { result, totalNumber } = response.data;
    setFileDbs(result);
    setTotalNumber(totalNumber); // rc-pagination total은 전체 아이템 수
  };

  // 삭제
  const remove = async (uuid: number) => {
    await FileDbService.remove(uuid);
    alert(messages.delete);
    selectList();
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <Meta name="description" content="FileDb 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-4">FileDb 조회</h1>

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
        {fileDbs.map((data) => (
          <div
            key={data.uuid}
            className="border rounded shadow hover:shadow-md overflow-hidden"
          >
            <img
              src={data.fileUrl}
              loading="lazy"
              alt={data.fileTitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h5 className="font-bold text-lg">{data.fileTitle}</h5>
              <p className="text-gray-600">{data.fileContent}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="px-2 py-1 bg-red-500 rounded text-white"
                  onClick={() => remove(data.uuid!)}
                >
                  삭제
                </button>
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

export default FiledbList;
