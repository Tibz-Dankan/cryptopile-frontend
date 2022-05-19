import axios from "axios";

const axiosApiAuthorized = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://stockpile-backend.herokuapp.com",
  // baseURL: "https://cryptopile-backends.azurewebsites.net",
  // timeout: 10000,
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  },
});
export default axiosApiAuthorized;
