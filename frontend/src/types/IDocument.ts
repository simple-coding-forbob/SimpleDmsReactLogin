export default interface IDocument {
  uuid?: string;            // 문서 고유 ID, 시퀀스
  title: string;            // 문서 제목
  content: string;          // 문서 내용
  eno?: number;             // 작성자 사원번호
  fileName?: string;         // 문서 내용
  fileUrl?: string;         // 첨부파일 URL
  fileData?: File | null;   // 첨부파일 데이터
}