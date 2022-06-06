import axios from "axios";
let backendBaseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  backendBaseURL = "http://localhost:5000";
} else {
  backendBaseURL = "https://stockpile-backend.herokuapp.com";
}

const axiosApiUnAuthorized = axios.create({
  baseURL: backendBaseURL,
  // timeout: 10000,
});

export default axiosApiUnAuthorized;
