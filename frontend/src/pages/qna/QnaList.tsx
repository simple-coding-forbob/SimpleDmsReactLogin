import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type IQna from "../../types/IQna";
import QnaService from "../../services/QnaService";

const QnaList = () => {
  const [qnas, setQnas] = useState<IQna[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const size = 3;

  const handlePageChange = (page: number) => {
    setPage(page);
    console.log("현재 페이지:", page);
  };

  const onChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setPage(1);
  };

  const selectList = async () => {
    try {
      const response = await QnaService.getAll(searchKeyword, page - 1, size);
      const { result, totalNumber } = response.data;
      setQnas(result);
      setTotalNumber(totalNumber);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Qna 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="부서명 검색"
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
        />
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-r"
          onClick={selectList}
        >
          Search
        </button>
      </div>

      <div>
        <table className="w-[100%] border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border-b">questioner</th>
              <th className="px-4 py-2 border-b">question</th>
              <th className="px-4 py-2 border-b">answer</th>
              <th className="px-4 py-2 border-b">answerer</th>
            </tr>
          </thead>
          <tbody>
            {qnas.map((data) => (
              <tr key={data.qno} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/qna-detail/${data.qno}`}>{data.questioner}</Link>
                </td>
                <td className="px-4 py-2 border-b">{data.question}</td>
                <td className="px-4 py-2 border-b">{data.answer}</td>
                <td className="px-4 py-2 border-b">{data.answerer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default QnaList;
