# FileDb 게시판
## 부서 게시판 주소: http://localhost:5173/fileDb

## react 코딩 순서: 1) types(1번만) 2) services 3) pages 4) routers(path 설정) 5) layout/Header(메뉴 표시)
## FileDb 테이블: TB_FILE_DB
### 컬럼:
    UUID	     VARCHAR2(1000 BYTE)
    FILE_TITLE	 VARCHAR2(1000 BYTE)
    FILE_CONTENT VARCHAR2(1000 BYTE)
    FILE_URL	 VARCHAR2(1000 BYTE)

# 기능별 코딩 순서: 리액트 화면
## 1. 부서 전체 조회: 페이지번호(리엑트 플러그인(컴포넌트) 사용)
### 1) types/IFileDb.ts -> 2) services/FileDbService.ts(getAll) -> 3) FileDbList.tsx(getAll) ->
    4) routers(path:fileDb) -> 5) layout/Header(Link to="/fileDb")

## 2. 부서 추가
### 1) services/FileDbService.ts(insert) -> 2) AddFileDb.tsx(insert) ->
    3) routers(path:add-fileDb) -> 4) layout/Header(Link to="/add-fileDb")

## 3. 부서 상세조회
### 1) services/FileDbService.ts(get) -> 2) FileDbDetail.tsx(get) ->
    3) routers(path:fileDb-detail/:uuid) -> 4) layout/Header(Link to="/fileDb-detail")

## 4. 부서 수정
### 1) services/FileDbService.ts(update) -> 2) FileDbDetail.tsx(update)

## 5. 부서 삭제
### 1) services/FileDbService.ts(remove) -> 2) FileDbDetail.tsx(remove)