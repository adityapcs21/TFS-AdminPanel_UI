// import axios from "axios";

// const jwtInterceptor = axios.create({});

// jwtInterceptor.interceptors.response.use(
//  (response) => {
//   return response;
//  },
//  async (error) => {
//   if (error.response.status === 401) {
//    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
//    let payload = {
//     "emailId": userDetails.emailId,
//     "grantType": "refresh",
//     "refreshToken": userDetails.refreshToken
//    }
//    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}blog/auth/admin/login`, payload)
//     .then((res) => {
//      localStorage.clear()
//      localStorage.setItem("token", res.data.accessToken);
//      localStorage.setItem("userDetails", JSON.stringify(res.data));
//      window.location.reload()
//     })
//     .catch((refreshTokenAPIError) => {
//      localStorage.removeItem("userDetails");
//      localStorage.removeItem("token");
//      return Promise.reject(refreshTokenAPIError)
//     })
//    return axios(error.config)
//   }
//   // else if (error.response.status === 500) {
//   //  return error
//   // }
//   // console.log("errorree", error)
//   Promise.reject(error)
//   // return error
//  }
// );
// export default jwtInterceptor


// jwtInterceptor.js
import axios from 'axios';

const jwtInterceptor = axios.create({
 baseURL: process.env.REACT_APP_API_ENDPOINT,
 // Other default configurations
});

// Function to refresh the access token
const refreshToken = async () => {
 // Make a request to your backend to refresh the token
 // Implement your refresh token logic here and return the new access token
 let userDetails = JSON.parse(localStorage.getItem("userDetails"));
 let payload = {
  "emailId": userDetails.emailId,
  "grantType": "refresh",
  "refreshToken": userDetails.refreshToken
 }
 let response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/admin/login`, payload)

 const newAccessToken = response.data.accessToken;
 // Save the new access token to your storage or state
 localStorage.setItem("token", response.data.accessToken);
 localStorage.setItem("userDetails", JSON.stringify(response.data));
 return newAccessToken;
};

// Add a request interceptor to attach the access token to every request
jwtInterceptor.interceptors.request.use(
 async (config) => {
  // Attach the access token to the request headers
  // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
 },
 (error) => {
  return Promise.reject(error);
 }
);

// Add a response interceptor to handle token expiration and refresh
jwtInterceptor.interceptors.response.use(
 (response) => {
  return response;
 },
 async (error) => {
  const originalRequest = error.config;

  // Check if the error is due to an expired token
  if (error.response.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true;

   try {
    // Refresh the token
    const newAccessToken = await refreshToken();

    // Update the original request with the new access token
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    // Retry the original request with the new token
    return axios(originalRequest);
   } catch (refreshError) {
    // Handle refresh token error, e.g., redirect to login page
    console.error('Error refreshing token:', refreshError);
    // You may want to handle this differently based on your requirements
    throw refreshError;
   }
  }

  return Promise.reject(error);
 }
);

export default jwtInterceptor;
