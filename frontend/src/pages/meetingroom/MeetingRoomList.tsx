import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Meta } from "react-head";
import { Link } from "react-router-dom";
import MeetingRoomService from "../../services/MeetingRoomService";
import type IMeetingRoom from "../../types/IMeetingRoom";

const MeetingRoomList = () => {
  const [meetingRooms, setMeetingRooms] = useState<IMeetingRoom[]>([]);
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
    const response = await MeetingRoomService.getAll(searchKeyword, page - 1, size);
    const { result, totalNumber } = response.data;
    setMeetingRooms(result);
    setTotalNumber(totalNumber);
    console.log(response.data);
  };

  useEffect(() => {
    selectList();
  }, [page]);

  return (
    <>
      <Meta name="description" content="회의실 조회 페이지입니다." />
      <h1 className="text-2xl font-bold mb-6">회의실 조회</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l p-2 focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="회의실 검색"
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
              <th className="px-4 py-2 border-b">roomName</th>
              <th className="px-4 py-2 border-b">loc</th>
              <th className="px-4 py-2 border-b">capacity</th>
            </tr>
          </thead>
          <tbody>
            {meetingRooms.map((data) => (
              <tr key={data.mid} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">
                  <Link to={`/meeting-room-detail/${data.mid}`}>{data.roomName}</Link>
                </td>
                <td className="px-4 py-2 border-b text-center">{data.loc}</td>
                <td className="px-4 py-2 border-b text-center">{data.capacity}</td>
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

export default MeetingRoomList;
