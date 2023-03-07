import axios from "axios";

// const axiosInstance = axios.create({
//   baseUrl: "http://localhost:4000",
// })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default axiosInstance;

// export default {
//   install: (app: App) => {
//     app.config.globalProperties.$axios = axiosInstance
//   }
// }
