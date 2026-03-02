import axios from "axios";
import messages from "./messages";

// todo: baseURL: "http://스프링ip:스프링port/공통url"
// react <-> springboot : json 객체(통신)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
<<<<<<< Updated upstream:frontend/src/common/axiosInstance.ts
});

// 공통 벡엔드 요청(axios) 인터셉터 (옵션)
axiosInstance.interceptors.request.use((config) => {
  const rawJwt = localStorage.getItem("jwt");

  if (rawJwt) {
    // jwt 가 있다면 파싱시작
    const jwt = JSON.parse(rawJwt);

    if (jwt && jwt.accessToken) {
      config.headers.Authorization = `Bearer ${jwt.accessToken}`;
    }
  }

  return config;
=======
  withCredentials: true, // httpOnly 쿠키 전송
>>>>>>> Stashed changes:frontend/src/common/CommonService.ts
});

// 공통 응답 인터셉터 (옵션)
axiosInstance.interceptors.response.use(
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

export default axiosInstance;