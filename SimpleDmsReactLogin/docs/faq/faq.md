# Faq 게시판
## 부서 게시판 주소: http://localhost:5173/faq

## react 코딩 순서: 1) types(1번만) 2) services 3) pages 4) routers(path 설정) 5) layout/Header(메뉴 표시)
## Faq 테이블: TB_FAQ
### 컬럼: 
    FNO	    NUMBER
    TITLE	VARCHAR2(255 BYTE)
    CONTENT	VARCHAR2(255 BYTE)

# 기능별 코딩 순서: 리액트 화면
## 1. 부서 전체 조회: 페이지번호(리엑트 플러그인(컴포넌트) 사용)
### 1) types/IFaq.ts -> 2) services/FaqService.ts(getAll) -> 3) FaqList.tsx(getAll) ->
    4) routers(path:faq) -> 5) layout/Header(Link to="/faq")

## 2. 부서 추가
### 1) services/FaqService.ts(insert) -> 2) AddFaq.tsx(insert) ->
    3) routers(path:add-faq) -> 4) layout/Header(Link to="/add-faq")

## 3. 부서 상세조회
### 1) services/FaqService.ts(get) -> 2) FaqDetail.tsx(get) ->
    3) routers(path:faq-detail/:fno) -> 4) layout/Header(Link to="/faq-detail")

## 4. 부서 수정
### 1) services/FaqService.ts(update) -> 2) FaqDetail.tsx(update)

## 5. 부서 삭제
### 1) services/FaqService.ts(remove) -> 2) FaqDetail.tsx(remove)