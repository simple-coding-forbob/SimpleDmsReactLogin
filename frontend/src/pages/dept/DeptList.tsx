import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { Link } from "react-router-dom";
import DeptService from "../../services/DeptService";
import type { IDept } from "../../types/IDept";

const DeptList = () => {
  const [depts, setDepts] = useState<IDept[]>([]);
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
    const response = await DeptService.getAll(searchKeyword, page - 1, size);
    const { result, totalNumber } = response.data;
    setDepts(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <Meta name="description" content="부서 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">부서 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="부서명 검색"
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

      <div>
        <table className="w-[100%] border border-gray-200">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 border-b">dname</th>
              <th className="px-4 py-2 border-b">loc</th>
            </tr>
          </thead>
          <tbody>
            {depts.map((data) => (
              <tr key={data.dno} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/dept-detail/${data.dno}`}>{data.dname}</Link>
                </td>
                <td className="px-4 py-2 border-b">{data.loc}</td>
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

export default DeptList;
