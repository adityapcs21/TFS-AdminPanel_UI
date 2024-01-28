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
   await axios.post(`${process.env.REACT_APP_API_ENDPOINT}blog/auth/admin/login`, payload)
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
  // else if (error.response.status === 500) {
  //  return error
  // }
  // console.log("errorree", error)
  Promise.reject(error)
  // return error
 }
);
export default jwtInterceptor