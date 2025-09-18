import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type IEventNotice from "../../types/IEventNotice";
import EventNoticeService from "../../services/EventNoticeService";

const EventNoticeList = () => {
  const [eventNotices, setEventNotice] = useState<IEventNotice[]>([]);
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
    const response = await EventNoticeService.getAll(
      searchKeyword,
      page - 1,
      size
    );
    const { result, totalNumber } = response.data;
    setEventNotice(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">공지사항 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="공지사항 검색"
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
              <th className="px-4 py-2 border-b">subject</th>
              <th className="px-4 py-2 border-b">text</th>
              <th className="px-4 py-2 border-b">isVisible</th>
              <th className="px-4 py-2 border-b">startDate</th>
              <th className="px-4 py-2 border-b">endDate</th>
            </tr>
          </thead>
          <tbody>
            {eventNotices.map((data) => (
              <tr key={data.eid} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link to={`/event-notice-detail/${data.eid}`}>
                    {data.subject}
                  </Link>
                </td>
                <td className="px-4 py-2 border-b">{data.text}</td>
                <td className="px-4 py-2 border-b">{data.isVisible}</td>
                <td className="px-4 py-2 border-b">{data.startDate}</td>
                <td className="px-4 py-2 border-b">{data.endDate}</td>
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

export default EventNoticeList;
