# 사원 게시판
## 부서 게시판 주소: http://localhost:5173/emp

## react 코딩 순서: 1) types(1번만) 2) services 3) pages 4) routers(path 설정) 5) layout/Header(메뉴 표시)
## 사원 테이블: TB_EMP
### 컬럼:
    ENO	        NUMBER
    ENAME	    VARCHAR2(255 BYTE)
    JOB	        VARCHAR2(255 BYTE)
    MANAGER	    NUMBER
    HIREDATE	DATE
    SALARY	    NUMBER
    COMMISSION	NUMBER
    DNO	        NUMBER

# 기능별 코딩 순서: 리액트 화면
## 1. 부서 전체 조회: 페이지번호(리엑트 플러그인(컴포넌트) 사용)
### 1) types/IEmp.ts -> 2) services/EmpService.ts(getAll) -> 3) EmpList.tsx(getAll) ->
    4) routers(path:emp) -> 5) layout/Header(Link to="/emp")

## 2. 부서 추가
### 1) services/EmpService.ts(insert) -> 2) AddEmp.tsx(insert) ->
    3) routers(path:add-emp) -> 4) layout/Header(Link to="/add-emp")

## 3. 부서 상세조회
### 1) services/EmpService.ts(get) -> 2) EmpDetail.tsx(get) ->
    3) routers(path:emp-detail/:eno) -> 4) layout/Header(Link to="/emp-detail")

## 4. 부서 수정
### 1) services/EmpService.ts(update) -> 2) EmpDetail.tsx(update)

## 5. 부서 삭제
### 1) services/EmpService.ts(remove) -> 2) EmpDetail.tsx(remove)