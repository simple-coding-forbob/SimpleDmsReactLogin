# 부서 게시판
## 부서 게시판 주소: http://localhost:5173/dept

## react 코딩 순서: 1) types(1번만) 2) services 3) pages 4) routers(path 설정) 5) layout/Header(메뉴 표시)
## 부서 테이블: TB_DEPT
### 컬럼:
    DNO	    NUMBER
    DNAME	VARCHAR2(255 BYTE)
    LOC	    VARCHAR2(255 BYTE)

# 기능별 코딩 순서: 리액트 화면
## 1. 부서 전체 조회: 페이지번호(리엑트 플러그인(컴포넌트) 사용)
### 1) types/IDept.ts -> 2) services/DeptService.ts(getAll) -> 3) DeptList.tsx(getAll) ->
    4) routers(path:dept) -> 5) layout/Header(Link to="/dept")

## 2. 부서 추가
### 1) services/DeptService.ts(insert) -> 2) AddDept.tsx(insert) ->
    3) routers(path:add-dept) -> 4) layout/Header(Link to="/add-dept")

## 3. 부서 상세조회
### 1) services/DeptService.ts(get) -> 2) DeptDetail.tsx(get) ->
    3) routers(path:dept-detail/:dno) -> 4) layout/Header(Link to="/dept-detail")

## 4. 부서 수정
### 1) services/DeptService.ts(update) -> 2) DeptDetail.tsx(update)

## 5. 부서 삭제
### 1) services/DeptService.ts(remove) -> 2) DeptDetail.tsx(remove)