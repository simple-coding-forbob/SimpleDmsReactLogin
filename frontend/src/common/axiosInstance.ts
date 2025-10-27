import axios from "axios";
import messages from "./messages";

// todo: baseURL: "http://스프링ip:스프링port/공통url"
// react <-> springboot : json 객체(통신)

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
});

// 공통 응답 인터셉터 (옵션)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    const msg = error.response?.data?.message || messages.contactAdmin;
    alert("[서버 오류] : " + msg);

    return Promise.reject(error);
  }
);

export default axiosInstance;