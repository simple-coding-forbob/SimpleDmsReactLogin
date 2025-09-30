import * as yup from "yup";
import messages from "../common/messages";

// 파일 업로드용 스키마
const galleryValidation = yup.object({
  galleryTitle: yup.string().required(messages.required),
});

export default galleryValidation;
