import * as yup from "yup";

// 파일 업로드용 스키마
const galleryValidation = yup.object({
  galleryTitle: yup.string().required("이미지명을 입력해주세요"),
});

export default galleryValidation;
