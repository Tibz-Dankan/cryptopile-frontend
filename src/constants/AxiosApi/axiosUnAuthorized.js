import axios from "axios";
let backendBaseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  backendBaseURL = "http://localhost:5000";
} else {
  backendBaseURL = "https://stockpile-backend.herokuapp.com";
  // serverBaseURL= "https://cryptopile-backends.azurewebsites.net";
}

const axiosApiUnAuthorized = axios.create({
  baseURL: backendBaseURL,
  // timeout: 10000,
});
// 35bc72fc-01d4-49f0-a84d-fc494fd31e6b
export default axiosApiUnAuthorized;
