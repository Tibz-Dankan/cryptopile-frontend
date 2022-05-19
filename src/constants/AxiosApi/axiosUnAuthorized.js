import axios from "axios";

const axiosApiUnAuthorized = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://stockpile-backend.herokuapp.com",
  // baseURL: "https://cryptopile-backends.azurewebsites.net",
  // timeout: 10000,
});
// 35bc72fc-01d4-49f0-a84d-fc494fd31e6b
export default axiosApiUnAuthorized;
