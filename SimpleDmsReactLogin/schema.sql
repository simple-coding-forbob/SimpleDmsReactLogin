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

-- ===============================================
-- 2️⃣ 테이블 삭제 (CASCADE 제약조건)
-- ===============================================
DROP TABLE TB_EMP CASCADE CONSTRAINTS;
DROP TABLE TB_DEPT CASCADE CONSTRAINTS;
DROP TABLE TB_FAQ CASCADE CONSTRAINTS;
DROP TABLE TB_QNA CASCADE CONSTRAINTS;
DROP TABLE TB_FREE_BOARD CASCADE CONSTRAINTS;
DROP TABLE TB_NEWS_BOARD CASCADE CONSTRAINTS;
DROP TABLE TB_NOTICE CASCADE CONSTRAINTS;
DROP TABLE TB_EVENT_NOTICE CASCADE CONSTRAINTS;
DROP TABLE TB_FILE_DB CASCADE CONSTRAINTS;
DROP TABLE TB_GALLERY CASCADE CONSTRAINTS;
DROP TABLE TB_MEMBER CASCADE CONSTRAINTS;
DROP TABLE TB_FILE_DB_LIKES CASCADE CONSTRAINTS;
DROP TABLE TB_GALLERY_LIKES CASCADE CONSTRAINTS;

-- ===============================================
-- 3️⃣ 도메인 테이블 생성
-- ===============================================

-- Departments
CREATE TABLE TB_DEPT (
                         DNO NUMBER NOT NULL PRIMARY KEY,
                         DNAME VARCHAR2(255),
                         LOC VARCHAR2(255),
                         INSERT_TIME TIMESTAMP,
                         UPDATE_TIME TIMESTAMP
);

-- Employees
CREATE TABLE TB_EMP (
                        ENO NUMBER NOT NULL PRIMARY KEY,
                        ENAME VARCHAR2(255),
                        JOB VARCHAR2(255),
                        MANAGER NUMBER,
                        HIREDATE TIMESTAMP,
                        SALARY NUMBER,
                        COMMISSION NUMBER,
                        DNO NUMBER,
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP,
                        FOREIGN KEY(DNO) REFERENCES TB_DEPT(DNO)
);

-- FAQ
CREATE TABLE TB_FAQ (
                        FNO NUMBER NOT NULL PRIMARY KEY,
                        TITLE VARCHAR2(255),
                        CONTENT VARCHAR2(255),
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP
);

-- QNA
CREATE TABLE TB_QNA (
                        QNO NUMBER NOT NULL PRIMARY KEY,
                        QUESTIONER VARCHAR2(255 BYTE) NOT NULL,
                        QUESTION VARCHAR2(4000 BYTE) NOT NULL,
                        ANSWER VARCHAR2(4000 BYTE),
                        ANSWERER VARCHAR2(255 BYTE),
                        INSERT_TIME TIMESTAMP,
                        UPDATE_TIME TIMESTAMP
);

-- Notice
CREATE TABLE TB_NOTICE (
                           NID NUMBER NOT NULL PRIMARY KEY,
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
                                 EID NUMBER NOT NULL PRIMARY KEY,
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
                            UUID VARCHAR2(1000) NOT NULL PRIMARY KEY,
                            FILE_TITLE VARCHAR2(1000),
                            FILE_CONTENT VARCHAR2(1000),
                            FILE_DATA BLOB,
                            FILE_URL VARCHAR2(1000),
                            INSERT_TIME TIMESTAMP,
                            UPDATE_TIME TIMESTAMP
);

-- Gallery
CREATE TABLE TB_GALLERY (
                            UUID VARCHAR2(1000) NOT NULL PRIMARY KEY,
                            GALLERY_TITLE VARCHAR2(1000),
                            GALLERY_DATA BLOB,
                            GALLERY_FILE_URL VARCHAR2(1000),
                            INSERT_TIME TIMESTAMP,
                            UPDATE_TIME TIMESTAMP
);

-- Member
CREATE TABLE TB_MEMBER (
                           EMAIL VARCHAR2(1000) NOT NULL PRIMARY KEY,
                           PASSWORD VARCHAR2(1000),
                           NAME VARCHAR2(1000),
                           CODE_NAME VARCHAR2(1000),
                           INSERT_TIME TIMESTAMP,
                           UPDATE_TIME TIMESTAMP
);

-- Free Board
CREATE TABLE TB_FREE_BOARD (
                               FID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
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
                               NID NUMBER NOT NULL PRIMARY KEY,
                               SUBJECT VARCHAR2(255),
                               TEXT VARCHAR2(4000),
                               EMAIL VARCHAR2(255),
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
