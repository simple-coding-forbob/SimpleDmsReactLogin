import axios from "axios";

// todo: baseURL: "http://스프링ip:스프링port/공통url"
// react <-> springboot : json 객체(통신)
const common = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// // 공통 요청 인터셉터 (옵션)
// common.interceptors.request.use((config) => {
//   // 토큰 있으면 자동으로 넣기
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 공통 응답 인터셉터 (옵션)
// common.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error);
//     return Promise.reject(error);
//   }
// );

export default common;