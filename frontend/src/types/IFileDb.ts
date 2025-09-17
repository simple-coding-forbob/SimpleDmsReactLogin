export default interface IFileDb {
  uuid?: number,
  fileTitle: string,
  fileContent: string,
  fileData?: File | null;
  fileUrl?: string | null
}