// import axios from "axios";

let backendBaseURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  backendBaseURL = "http://localhost:5000";
} else {
  // backendBaseURL = "https://stockpile-backend.herokuapp.com";
  backendBaseURL = "https://cryptopile-backend.onrender.com";
}

// const axiosApiAuthorized = axios.create({
//   baseURL: backendBaseURL,
//   // timeout: 10000,
//   headers: {
//     Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
//   },
// });

// export default axiosApiAuthorized;
export default backendBaseURL;
