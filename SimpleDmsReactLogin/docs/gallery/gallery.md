# Gallery 게시판gallery
## 부서 게시판 주소: http://localhost:5173/gallery

## react 코딩 순서: 1) types(1번만) 2) services 3) pages 4) routers(path 설정) 5) layout/Header(메뉴 표시)
## Gallery 테이블: TB_GALLERY
    UUID	         VARCHAR2(1000 BYTE)
    GALLERY_TITLE	 VARCHAR2(1000 BYTE)
    GALLERY_FILE_URL VARCHAR2(1000 BYTE)

# 기능별 코딩 순서: 리액트 화면
## 1. 부서 전체 조회: 페이지번호(리엑트 플러그인(컴포넌트) 사용)
### 1) types/IGallery.ts -> 2) services/GalleryService.ts(getAll) -> 3) GalleryList.tsx(getAll) ->
    4) routers(path:gallery) -> 5) layout/Header(Link to="/gallery")

## 2. 부서 추가
### 1) services/GalleryService.ts(insert) -> 2) AddGallery.tsx(insert) ->
    3) routers(path:add-gallery) -> 4) layout/Header(Link to="/add-gallery")

## 3. 부서 상세조회
### 1) services/GalleryService.ts(get) -> 2) GalleryDetail.tsx(get) ->
    3) routers(path:gallery-detail/:uuid) -> 4) layout/Header(Link to="/gallery-detail")

## 4. 부서 수정
### 1) services/GalleryService.ts(update) -> 2) GalleryDetail.tsx(update)

## 5. 부서 삭제
### 1) services/GalleryService.ts(remove) -> 2) GalleryDetail.tsx(remove)