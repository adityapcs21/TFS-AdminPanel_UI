import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
 (response) => {
  return response;
 },
 async (error) => {
  if (error.response.status === 401) {
   let userDetails = JSON.parse(localStorage.getItem("userDetails"));
   let payload = {
    "emailId": userDetails.emailId,
    "grantType": "refresh",
    "refreshToken": userDetails.refreshToken
   }
   await axios.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/auth/admin/login", payload)
    .then((res) => {
     localStorage.clear()
     localStorage.setItem("token", res.data.accessToken);
     localStorage.setItem("userDetails", JSON.stringify(res.data));
     window.location.reload()
    })
    .catch((refreshTokenAPIError) => {
     localStorage.removeItem("userDetails");
     localStorage.removeItem("token");
     return Promise.reject(refreshTokenAPIError)
    })
   return axios(error.config)
  }
  // else if (error.response.status === 403) {
  //  localStorage.clear()
  //  window.location.reload()
  // }

  Promise.reject(error)
 }
);
export default jwtInterceptor