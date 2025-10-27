import { useEffect, useState } from "react";

import Pagination from "rc-pagination";
import { Meta } from "react-head";
import { Link } from "react-router-dom";
import EmpService from "../../services/EmpService";
import type { IEmp } from "../../types/IEmp";

const EmpList = () => {
  const [emps, setEmp] = useState<IEmp[]>([]);
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
    const response = await EmpService.getAll(searchKeyword, page - 1, size);
    const { result, totalNumber } = response.data;
    setEmp(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <Meta name="description" content="사원 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">사원 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-[100%] border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
          placeholder="사원명 검색"
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
              <th className="px-4 py-2 border-b">eno</th>
              <th className="px-4 py-2 border-b">ename</th>
              <th className="px-4 py-2 border-b">job</th>
              <th className="px-4 py-2 border-b">manager</th>
              <th className="px-4 py-2 border-b">hiredate</th>
              <th className="px-4 py-2 border-b">salary</th>
              <th className="px-4 py-2 border-b">commission</th>
              <th className="px-4 py-2 border-b">dno</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((data) => (
              <tr key={data.eno} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/emp-detail/${data.eno}`}>{data.eno}</Link>
                </td>
                <td className="px-4 py-2 border-b">{data.ename}</td>
                <td className="px-4 py-2 border-b">{data.job}</td>
                <td className="px-4 py-2 border-b">{data.manager}</td>
                <td className="px-4 py-2 border-b">{data.hiredate}</td>
                <td className="px-4 py-2 border-b">{data.salary}</td>
                <td className="px-4 py-2 border-b">{data.commission}</td>
                <td className="px-4 py-2 border-b">{data.dno}</td>
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

export default EmpList;
