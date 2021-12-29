import axios from "axios";

const axiosApiUnAuthorized = axios.create({
  baseURL: "http://localhost:5000",
  //   baseURL: "https://stockpile-backend.herokuapp.com",
});

export default axiosApiUnAuthorized;
