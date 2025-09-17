import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type IFaq from "../../types/IFaq";
import FaqService from "../../services/FaqService";

const FaqList = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
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
      const response = await FaqService.getAll(searchKeyword, page - 1, size);
      const { result, totalNumber } = response.data;
      setFaqs(result);
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
      <h1 className="text-2xl font-bold mb-6">Faq 조회</h1>

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
              <th className="px-4 py-2 border-b">title</th>
              <th className="px-4 py-2 border-b">content</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((data) => (
              <tr key={data.fno} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/faq-detail/${data.fno}`}>{data.title}</Link>
                </td>
                <td className="px-4 py-2 border-b">{data.content}</td>
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

export default FaqList;
