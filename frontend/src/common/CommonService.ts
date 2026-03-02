import axios from "axios";
import messages from "./messages";

// todo: baseURL: "http://스프링ip:스프링port/공통url"
// react <-> springboot : json 객체(통신)

const common = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // httpOnly 쿠키 전송
});

// 공통 응답 인터셉터 (옵션)
common.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status && status !== 401) { // 401은 새로고침 시 자연스러운 로그인 상태 확인 실패
      const msg = error.response?.data?.message || messages.contactAdmin;
      alert("[서버 오류] : " + msg);
    }
    return Promise.reject(error);
  }
);

export default common;