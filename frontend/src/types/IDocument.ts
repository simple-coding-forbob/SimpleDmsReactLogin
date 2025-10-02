export default interface IDocument {
  docId?: string;           // 문서 고유 ID, 시퀀스
  title: string;            // 문서 제목
  content: string;          // 문서 내용
  drafter?: number;         // 작성자 사원번호
}