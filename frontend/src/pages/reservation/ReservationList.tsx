import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Meta } from "react-head";
import type IReservation from "../../types/IReservation";
import ReservationService from "../../services/ReservationService";

function ReservationList() {
  const [reservations, setReservations] = useState<IReservation[]>([]);
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
    const response = await ReservationService.getAll(
      searchKeyword,
      page - 1,
      size
    );
    const { result, totalNumber } = response.data;
    setReservations(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <Meta name="description" content="뉴스 게시판 페이지입니다." />
      <h1 className="mid-2xl font-bold mb-6">뉴스 게시판 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="mid"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="제목 검색"
          value={searchKeyword}
          onChange={onChangeSearchKeyword}
        />
        <button
          className="bg-blue-700 mid-white hover:bg-blue-800 px-4 py-2 rounded-r min-w-[5rem]"
          onClick={selectList}
        >
          검색
        </button>
      </div>

      <div>
        <table className="w-[100%] border border-gray-200">
          <thead className="bg-blue-700 mid-white">
            <tr>
              <th className="px-4 py-2 border-b">email</th>
              <th className="px-4 py-2 border-b">mid</th>
              <th className="px-4 py-2 border-b">roomName</th>
              <th className="px-4 py-2 border-b">startTime</th>
              <th className="px-4 py-2 border-b">endTime</th>
              <th className="px-4 py-2 border-b">status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((data) => (
              <tr key={data.rid} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/news-board-detail/${data.rid}`}>
                    {data.email}
                  </Link>
                </td>
                <td className="px-4 py-2 border-b">{data.mid}</td>
                <td className="px-4 py-2 border-b mid-center">{data.roomName}</td>
                <td className="px-4 py-2 border-b mid-center">{data.startTime}</td>
                <td className="px-4 py-2 border-b mid-center">{data.endTime}</td>
                <td className="px-4 py-2 border-b mid-center">{data.status}</td>
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
}

export default ReservationList;
