export default interface IGallery {
  uuid?: number,
  galleryTitle: string,
  galleryData?: File | null;
  galleryFileUrl?: string | null
}