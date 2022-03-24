import axios from "axios";

const axiosApiUnAuthorized = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://stockpile-backend.herokuapp.com",
  // baseURL: "https://cryptopile-backends.azurewebsites.net",
});

export default axiosApiUnAuthorized;
