import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, logout } = useAuthStore();
  const nav = useNavigate();

  const logoutMenu = () => {
    logout();
    nav("/login");
  };

  return (
    // TODO: md:xxx (768px 이상에서 적용), lg:xxx (1024px 이상에서 적용), 기본은 모바일 우선 디자인
    <nav className="bg-gray-100 text-gray-800">
      <div className="bg-blue-700 text-white flex justify-between border-b items-center py-1 px-5">
        {/* Logo + 메뉴 */}
        <div className="text font-bold">simple-coding</div>

        {/* 햄버거 + 로그인 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 햄버거 버튼 (모바일) */}
          <button
            aria-label="햄버거 메뉴 열기/닫기"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 모바일 메뉴: md:hidden (758px 이상에서 숨김) */}
      {/* flex-col : 세로 바꾸기  */}

      <div
        className={`flex flex-col gap-4 transition-all duration-700
                                   md:flex-row md:justify-between md:items-center
                                   ${
                                     isOpen
                                       ? "max-h-1000"
                                       : "max-h-0 overflow-hidden"
                                   }
                                   `}
      >
        <ul
          className="flex flex-col gap-4 pl-5 py-2
                              md:flex-row
          "
        >
          {/* PC 메뉴 */}
          <li>
            <Link to="/" className="hover:underline">
              홈
            </Link>
          </li>
          <li></li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              부서
            </Link>
            {/* w-[단위] */}
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/dept" className="hover:underline">
                  부서조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-dept" className="hover:underline">
                  부서추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              사원
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/emp" className="hover:underline">
                  사원조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-emp" className="hover:underline">
                  사원추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Faq
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/faq" className="hover:underline">
                  Faq조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-faq" className="hover:underline">
                  Faq추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Qna
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/qna" className="hover:underline">
                  Qna조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-qna" className="hover:underline">
                  Qna추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Notice
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/notice" className="hover:underline">
                  Notice조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-notice" className="hover:underline">
                  Notice추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              EventNotice
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/event-notice" className="hover:underline">
                  EventNotice 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-event-notice" className="hover:underline">
                  EventNotice 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              FileDb
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/fileDb" className="hover:underline">
                  FileDb 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-fileDb" className="hover:underline">
                  FileDb 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Gallery
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/gallery" className="hover:underline">
                  Gallery 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-gallery" className="hover:underline">
                  Gallery 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              FreeBoard
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/free-board" className="hover:underline">
                  FreeBoard 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-free-board" className="hover:underline">
                  FreeBoard 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              NewsBoard
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/news-board" className="hover:underline">
                  NewsBoard 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-news-board" className="hover:underline">
                  NewsBoard 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              MeetingRoom
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/meeting-room" className="hover:underline">
                  MeetingRoom 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-meeting-room" className="hover:underline">
                  MeetingRoom 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Reservation
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/reservation" className="hover:underline">
                  Reservation 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-reservation" className="hover:underline">
                  Reservation 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              PublicCar
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/public-car" className="hover:underline">
                  PublicCar 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-public-car" className="hover:underline">
                  PublicCar 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Booking
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/booking" className="hover:underline">
                  Booking 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-booking" className="hover:underline">
                  Booking 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Template
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/template" className="hover:underline">
                  Template 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-template" className="hover:underline">
                  Template 추가
                </Link>
              </li>
            </ul>
          </li>
          <li className="group md:relative">
            <Link to="#" className="hover:underline">
              Document
            </Link>
            <ul
              className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
            >
              <li className="m-2">
                <Link to="/document" className="hover:underline">
                  Document 조회
                </Link>
              </li>
              <li className="m-2">
                <Link to="/add-document" className="hover:underline">
                  Document 추가
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <ul
          className="flex flex-col gap-4  pr-5 py-2
                               md:flex-row"
        >
          {!loggedIn && (
            <>
              <li>
                <Link to="/register">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </>
          )}

          {loggedIn && (
            <>
              <li className="group md:relative">
                <Link to="#" className="hover:underline">
                  전자 결재
                </Link>
                <ul
                  className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-42 md:p-2 md:rounded"
                >
                  <li className="m-2">
                    <Link to="/approval-drafts" className="hover:underline">
                      내가 올린 문서
                    </Link>
                  </li>
                  <li className="m-2">
                    <Link to="/approval-pending" className="hover:underline">
                      내가 결재해야 할 문서
                    </Link>
                  </li>
                  <li className="m-2">
                    <Link to="/approval-completed" className="hover:underline">
                      내가 이미 결재한 문서
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <button onClick={logoutMenu}>로그아웃</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
