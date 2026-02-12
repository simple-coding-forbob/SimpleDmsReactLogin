-- ===============================================
-- 1️⃣ 시퀀스 정의
-- ===============================================
DROP SEQUENCE SQ_DEPT;
CREATE SEQUENCE SQ_DEPT START WITH 10 INCREMENT BY 10;

DROP SEQUENCE SQ_EMP;
CREATE SEQUENCE SQ_EMP START WITH 8000 INCREMENT BY 1;

DROP SEQUENCE SQ_FAQ;
CREATE SEQUENCE SQ_FAQ START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_QNA;
CREATE SEQUENCE SQ_QNA START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_FREE_BOARD;
CREATE SEQUENCE SQ_FREE_BOARD START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_NEWS_BOARD;
CREATE SEQUENCE SQ_NEWS_BOARD START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_NOTICE;
CREATE SEQUENCE SQ_NOTICE START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_EVENT_NOTICE;
CREATE SEQUENCE SQ_EVENT_NOTICE START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_FILE_DB_LIKES;
CREATE SEQUENCE SQ_FILE_DB_LIKES START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_GALLERY_LIKES;
CREATE SEQUENCE SQ_GALLERY_LIKES START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_MEETING_ROOM;
CREATE SEQUENCE SQ_MEETING_ROOM START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_PUBLIC_CAR;
CREATE SEQUENCE SQ_PUBLIC_CAR START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_RESERVATION;
CREATE SEQUENCE SQ_RESERVATION START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_BOOKING;
CREATE SEQUENCE SQ_BOOKING START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_TEMPLATE;
CREATE SEQUENCE SQ_TEMPLATE START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_DOCUMENT;
CREATE SEQUENCE SQ_DOCUMENT START WITH 1 INCREMENT BY 1;

DROP SEQUENCE SQ_APPROVAL;
CREATE SEQUENCE SQ_APPROVAL START WITH 1 INCREMENT BY 1;

-- ===============================================
-- 2️⃣ 테이블 삭제 (CASCADE 제약조건)
-- ===============================================
DROP TABLE TB_FILE_DB_LIKES CASCADE CONSTRAINTS;
DROP TABLE TB_GALLERY_LIKES CASCADE CONSTRAINTS;
DROP TABLE TB_FREE_BOARD CASCADE CONSTRAINTS;
DROP TABLE TB_NEWS_BOARD CASCADE CONSTRAINTS;
DROP TABLE TB_RESERVATION CASCADE CONSTRAINTS;
DROP TABLE TB_BOOKING CASCADE CONSTRAINTS;

DROP TABLE TB_FILE_DB CASCADE CONSTRAINTS;
DROP TABLE TB_GALLERY CASCADE CONSTRAINTS;
DROP TABLE TB_MEETING_ROOM CASCADE CONSTRAINTS;
DROP TABLE TB_PUBLIC_CAR CASCADE CONSTRAINTS;

DROP TABLE TB_MEMBER CASCADE CONSTRAINTS;
DROP TABLE TB_EMP CASCADE CONSTRAINTS;
DROP TABLE TB_DEPT CASCADE CONSTRAINTS;

DROP TABLE TB_FAQ CASCADE CONSTRAINTS;
DROP TABLE TB_QNA CASCADE CONSTRAINTS;
DROP TABLE TB_NOTICE CASCADE CONSTRAINTS;
DROP TABLE TB_EVENT_NOTICE CASCADE CONSTRAINTS;

DROP TABLE TB_TEMPLATE CASCADE CONSTRAINTS;
DROP TABLE TB_DOCUMENT CASCADE CONSTRAINTS;
DROP TABLE TB_APPROVAL CASCADE CONSTRAINTS;

-- ===============================================
-- 3️⃣ 도메인 테이블 생성
-- ===============================================

-- Departments
CREATE TABLE TB_DEPT (
                         DNO NUMBER PRIMARY KEY,
                         DNAME VARCHAR2(255),
                         LOC VARCHAR2(255),
                         INSERT_TIME TIMESTAMP,
                         UPDATE_TIME TIMESTAMP
);

-- Employees
CREATE TABLE TB_EMP (
                        ENO NUMBER PRIMARY KEY,
                        ENAME VARCHAR2(255),
                        JOB VARCHAR2(255),
                        MANAGER NUMBER,
                        HIREDATE TIMESTAMP,
                        SALARY NUMBER,
                        COMMISSION NUMBER,
                        DNO NUMBER NOT NULL,
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP,
                        FOREIGN KEY(DNO) REFERENCES TB_DEPT(DNO)
);

-- FAQ
CREATE TABLE TB_FAQ (
                        FNO NUMBER PRIMARY KEY,
                        TITLE VARCHAR2(255),
                        CONTENT VARCHAR2(255),
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP
);

-- QNA
CREATE TABLE TB_QNA (
                        QNO NUMBER PRIMARY KEY,
                        QUESTIONER VARCHAR2(255 BYTE) NOT NULL,
                        QUESTION VARCHAR2(4000 BYTE) NOT NULL,
                        ANSWER VARCHAR2(4000 BYTE),
                        ANSWERER VARCHAR2(255 BYTE),
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP
);

-- Notice
CREATE TABLE TB_NOTICE (
                           NID NUMBER PRIMARY KEY,
                           TITLE VARCHAR2(255),
                           CONTENT VARCHAR2(255),
                           IS_VISIBLE CHAR(1) DEFAULT 'N',
                           START_DATE TIMESTAMP,
                           END_DATE TIMESTAMP,
                           INSERT_TIME TIMESTAMP,
                           UPDATE_TIME TIMESTAMP
);

-- Event Notice
CREATE TABLE TB_EVENT_NOTICE (
                                 EID NUMBER PRIMARY KEY,
                                 SUBJECT VARCHAR2(255),
                                 TEXT VARCHAR2(255),
                                 IS_VISIBLE CHAR(1) DEFAULT 'N',
                                 START_DATE TIMESTAMP,
                                 END_DATE TIMESTAMP,
                                 INSERT_TIME TIMESTAMP,
                                 UPDATE_TIME TIMESTAMP
);

-- File Upload
CREATE TABLE TB_FILE_DB (
                            UUID VARCHAR2(1000) PRIMARY KEY,
                            FILE_TITLE VARCHAR2(1000),
                            FILE_CONTENT VARCHAR2(1000),
                            FILE_URL VARCHAR2(1000),
                            INSERT_TIME TIMESTAMP,
                            UPDATE_TIME TIMESTAMP
);

-- Gallery
CREATE TABLE TB_GALLERY (
                            UUID VARCHAR2(1000) PRIMARY KEY,
                            GALLERY_TITLE VARCHAR2(1000),
                            GALLERY_FILE_URL VARCHAR2(1000),
                            INSERT_TIME TIMESTAMP,
                            UPDATE_TIME TIMESTAMP
);

-- Member
CREATE TABLE TB_MEMBER (
                           EMAIL VARCHAR2(1000) PRIMARY KEY,
                           PASSWORD VARCHAR2(1000),
                           NAME VARCHAR2(1000),
                           CODE_NAME VARCHAR2(1000),
                           ENO NUMBER NOT NULL,
                           INSERT_TIME TIMESTAMP,
                           UPDATE_TIME TIMESTAMP,
                           CONSTRAINT FK_EMP_ENO FOREIGN KEY (ENO)
                               REFERENCES TB_EMP(ENO)
);

-- Free Board
CREATE TABLE TB_FREE_BOARD (
                               FID NUMBER PRIMARY KEY,
                               TITLE VARCHAR2(255),
                               CONTENT VARCHAR2(2000),
                               EMAIL VARCHAR2(255) NOT NULL,
                               VIEW_COUNT NUMBER,
                               INSERT_TIME TIMESTAMP,
                               UPDATE_TIME TIMESTAMP,
                               CONSTRAINT FK_FREE_BOARD_MEMBER FOREIGN KEY (EMAIL)
                                   REFERENCES TB_MEMBER(EMAIL)
);

-- News Board
CREATE TABLE TB_NEWS_BOARD (
                               NID NUMBER PRIMARY KEY,
                               SUBJECT VARCHAR2(255),
                               TEXT VARCHAR2(4000),
                               EMAIL VARCHAR2(255) NOT NULL,
                               VIEW_COUNT NUMBER,
                               INSERT_TIME TIMESTAMP,
                               UPDATE_TIME TIMESTAMP,
                               CONSTRAINT FK_NEWS_BOARD_MEMBER FOREIGN KEY (EMAIL)
                                   REFERENCES TB_MEMBER(EMAIL)
);

-- File Likes
CREATE TABLE TB_FILE_DB_LIKES (
                                  ID NUMBER PRIMARY KEY,
                                  EMAIL VARCHAR2(1000) NOT NULL,
                                  UUID VARCHAR2(1000) NOT NULL,
                                  LIKE_COUNT NUMBER(10) DEFAULT 0,
                                  INSERT_TIME TIMESTAMP,
                                  UPDATE_TIME TIMESTAMP,
                                  CONSTRAINT FK_MEMBER_EMAIL FOREIGN KEY (EMAIL) REFERENCES TB_MEMBER (EMAIL),
                                  CONSTRAINT FK_FILE_DB_UUID FOREIGN KEY (UUID) REFERENCES TB_FILE_DB (UUID)
);

-- Gallery Likes
CREATE TABLE TB_GALLERY_LIKES (
                                  ID NUMBER PRIMARY KEY,
                                  EMAIL VARCHAR2(1000) NOT NULL,
                                  UUID VARCHAR2(1000) NOT NULL,
                                  LIKE_COUNT NUMBER(10) DEFAULT 0,
                                  INSERT_TIME TIMESTAMP,
                                  UPDATE_TIME TIMESTAMP,
                                  CONSTRAINT FK_MEMBER_EMAIL2 FOREIGN KEY (EMAIL) REFERENCES TB_MEMBER (EMAIL),
                                  CONSTRAINT FK_GALLERY_UUID FOREIGN KEY (UUID) REFERENCES TB_GALLERY (UUID)
);

CREATE TABLE TB_MEETING_ROOM (
                                 MID NUMBER PRIMARY KEY,                       -- 회의실 고유 ID
                                 ROOM_NAME VARCHAR2(100),                      -- 회의실 이름
                                 LOC VARCHAR2(100),                            -- 회의실 위치
                                 CAPACITY NUMBER,                              -- 수용 인원
                                 INSERT_TIME TIMESTAMP,
                                 UPDATE_TIME TIMESTAMP
);


CREATE TABLE TB_PUBLIC_CAR (
                               PID NUMBER PRIMARY KEY,                       -- 공용차 고유 ID
                               CAR_NAME VARCHAR2(255),                       -- 공용차 이름
                               FLOOR VARCHAR2(255),                          -- 주차장 위치
                               CAPACITY NUMBER,                              -- 수용 인원
                               INSERT_TIME TIMESTAMP,
                               UPDATE_TIME TIMESTAMP
);

CREATE TABLE TB_RESERVATION (
                                RID NUMBER PRIMARY KEY,                        -- 예약 고유 ID
                                EMAIL VARCHAR2(255) ,                          -- 예약 아이디
                                MID NUMBER NOT NULL,                           -- 예약 회의실 ID
                                START_TIME TIMESTAMP,                          -- 예약 시작 시간
                                END_TIME TIMESTAMP,                            -- 예약 종료 시간
                                STATUS CHAR(1),                                -- 예약 상태 (R(예약) / C(취소) / E(종료))
                                INSERT_TIME TIMESTAMP,
                                UPDATE_TIME TIMESTAMP,
                                CONSTRAINT FK_RESV_EMP FOREIGN KEY (EMAIL) REFERENCES TB_MEMBER(EMAIL),
                                CONSTRAINT FK_RESV_ROOM FOREIGN KEY (MID) REFERENCES TB_MEETING_ROOM(MID)
);


CREATE TABLE TB_BOOKING (
                            BID NUMBER PRIMARY KEY,                        -- 예약 고유 ID
                            EMAIL VARCHAR2(255) NOT NULL,                  -- 예약 아이디
                            PID NUMBER NOT NULL,                           -- 예약 공용차 ID
                            START_TIME TIMESTAMP,                          -- 예약 시작 시간
                            END_TIME TIMESTAMP,                            -- 예약 종료 시간
                            STATUS VARCHAR2(1),                            -- 예약 상태 (R(예약) / C(취소) / E(종료))
                            INSERT_TIME TIMESTAMP,
                            UPDATE_TIME TIMESTAMP,
                            CONSTRAINT FK_BOOKING_EMP FOREIGN KEY (EMAIL) REFERENCES TB_MEMBER(EMAIL),
                            CONSTRAINT FK_BOOKING_CAR FOREIGN KEY (PID) REFERENCES TB_PUBLIC_CAR(PID)
);

-- 재스퍼 템플릿 관리 테이블
CREATE TABLE TB_TEMPLATE (
                             TID NUMBER PRIMARY KEY,
                             TITLE       VARCHAR2(1000) NOT NULL,       -- 템플릿 이름
                             CONTENT VARCHAR2(4000),
                             FILE_NAME   VARCHAR2(4000) NOT NULL,      -- 파일 경로
                             INSERT_TIME TIMESTAMP DEFAULT SYSTIMESTAMP,
                             UPDATE_TIME TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- 전자 결재: 문서 테이블 (PDF 경로 저장)
CREATE TABLE TB_DOCUMENT (
                             DOC_ID      NUMBER PRIMARY KEY, -- 문서 PK
                             TITLE       VARCHAR2(1000),
                             CONTENT     VARCHAR2(4000),
                             DRAFTER     NUMBER NOT NULL,        -- 기안자 (FK: TB_EMP)
                             TID         NUMBER,                 -- PDF 파일 경로 저장
                             INSERT_TIME TIMESTAMP DEFAULT SYSTIMESTAMP,
                             UPDATE_TIME TIMESTAMP DEFAULT SYSTIMESTAMP,
                             CONSTRAINT FK_DOC_TEMPLATE FOREIGN KEY (TID)
                                 REFERENCES TB_TEMPLATE(TID),
                             CONSTRAINT FK_DOC_DRAFTER FOREIGN KEY (DRAFTER)
                                 REFERENCES TB_EMP(ENO)
);

-- 결재 라인 테이블
-- 대기(P,PENDING)/승인(A,APPROVAL)/반려(R,REVOKE)
CREATE TABLE TB_APPROVAL (
                             AID          NUMBER PRIMARY KEY,
                             DOC_ID       NUMBER NOT NULL,
                             APPROVER     NUMBER NOT NULL,  -- 결재자
                             SEQ          NUMBER,           -- 결재 순서
                             STATUS       VARCHAR2(1),      -- P:대기, A:승인, R:반려
                             APPROVE_TIME TIMESTAMP,
                             NOTE         VARCHAR2(4000),   -- 결재 메모
                             INSERT_TIME  TIMESTAMP DEFAULT SYSTIMESTAMP,
                             UPDATE_TIME  TIMESTAMP DEFAULT SYSTIMESTAMP,
                             CONSTRAINT FK_LINE_DOC FOREIGN KEY (DOC_ID)
                                 REFERENCES TB_DOCUMENT(DOC_ID),
                             CONSTRAINT FK_LINE_APPROVER FOREIGN KEY (APPROVER)
                                 REFERENCES TB_EMP(ENO)
);
