import axios from "axios";

// should be placed a folder called constants
// And also find a way of preventing token error wen some one just login for the first time (its)
// may try to handle it from the login component by setting some conditions

const axiosApiAuthorized = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://stockpile-backend.herokuapp.com",
  // baseURL: "https://cryptopile-backends.azurewebsites.net",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});
export default axiosApiAuthorized;
