import axios from "axios";

const axiosApiAuthorized = axios.create({
  baseURL: "http://localhost:5000",
  //   baseURL: "https://stockpile-backend.herokuapp.com",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});
export default axiosApiAuthorized;
