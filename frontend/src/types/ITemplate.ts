export default interface ITemplate {
  tid?: number; // 템플릿 고유 ID, 시퀀스
  title: string; // 템플릿 제목
  content: string; // 템플릿 내용
  fileName?: string;
  fileData: File | null;
}
