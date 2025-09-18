import axios from "axios";

// todo: baseURL: "http://스프링ip:스프링port/공통url"
// react <-> springboot : json 객체(통신)
const common = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 공통 벡엔드 요청(axios) 인터셉터 (옵션)
common.interceptors.request.use((config) => {
  const rawJwt = localStorage.getItem("jwt");

  if (rawJwt) {                           // jwt 가 있다면 파싱시작
    const jwt = JSON.parse(rawJwt);

    if (jwt && jwt.accessToken) {
      config.headers.Authorization = `Bearer ${jwt.accessToken}`;
    }
  } 

  return config;
});

// 공통 응답 인터셉터 (옵션)
common.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error(error)
      alert("다시 로그인 해주세요.");
      window.location.href = "/login";
    } else {
      console.error(error)
      alert("서버 오류가 발생했습니다. 관리자에게 문의하세요 ");
    }
    return Promise.reject(error);
  }
);

export default common;