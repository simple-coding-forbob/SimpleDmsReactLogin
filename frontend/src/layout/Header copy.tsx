import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // TODO: md:xxx (768px 이상에서 적용), lg:xxx (1024px 이상에서 적용), 기본은 모바일 우선 디자인
    <nav className="bg-gray-100 text-gray-800">
      <div className="bg-blue-800 flex justify-between border-b items-center py-1 px-5">
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
      {isOpen && (
        <div className={`flex flex-col gap-4 py-1 px-5 overflow-hidden transition-all duration-300 ease-in-out
                                   md:flex-row md:justify-between md:items-start
                                   ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                                   `}
                                  
        >
          <ul className="flex flex-col gap-4
                              md:flex-row
          ">
            {/* PC 메뉴 */}
            <li>
              <a href="/">홈</a>
            </li>
            <li></li>
            <li className="group md:relative">
              <a href="#">부서</a>
              {/* w-[단위] */}
              <ul className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-32 md:p-2 md:rounded">
                <li className="m-2">
                  <a href="/dept">부서조회</a>
                </li>
                <li className="m-2">
                  <a href="/add-dept">부서추가</a>
                </li>
              </ul>
            </li>
            <li className="group md:relative">
              <a href="#">사원</a>
              <ul className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-32 md:p-2 md:rounded">
                <li className="m-2">
                  <a href="/emp">사원조회</a>
                </li>
                <li className="m-2">
                  <a href="/add-emp">사원추가</a>
                </li>
              </ul>
            </li>
            <li className="group md:relative">
              <a href="#" className="hover:underline">
                FileDb
              </a>
              <ul className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-32 md:p-2 md:rounded">
                <li className="m-2">
                  <a href="/fileDb" className="hover:underline">
                    FileDb 조회
                  </a>
                </li>
                <li className="m-2">
                  <a href="/add-fileDb" className="hover:underline">
                    FileDb 추가
                  </a>
                </li>
              </ul>
            </li>
            <li className="group md:relative">
              <a href="#" className="hover:underline">
                Gallery
              </a>
              <ul className="md:absolute md:top-full md:left-0 md:opacity-0 md:invisible md:group-hover:opacity-100 
            md:group-hover:visible md:transition-all md:bg-white md:text-black md:w-32 md:p-2 md:rounded">
                <li className="m-2">
                  <a href="/gallery" className="hover:underline">
                    Gallery 조회
                  </a>
                </li>
                <li className="m-2">
                  <a href="/add-gallery" className="hover:underline">
                    Gallery 추가
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex flex-col gap-4
                               md:flex-row">
            <li>
              <a href="#">회원가입</a>
            </li>
            <li>
              <a href="#">로그인</a>
            </li>
            <li>
              <a href="#">마이페이지</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
