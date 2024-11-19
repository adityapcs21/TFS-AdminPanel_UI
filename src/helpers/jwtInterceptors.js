
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const jwtInterceptor = axios.create({
//  baseURL: process.env.REACT_APP_API_ENDPOINT,
//  // Other default configurations
// });

// // Function to refresh the access token
// const refreshToken = async () => {
//  // Make a request to your backend to refresh the token
//  // Implement your refresh token logic here and return the new access token
//  let userDetails = JSON.parse(localStorage.getItem("tfsUserDetails"));
//  let payload = {
//   "emailId": userDetails.emailId,
//   "grantType": "refresh",
//   "refreshToken": userDetails.refreshToken
//  }
//  let response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/admin/login`, payload)

//  const newAccessToken = response.data.accessToken;
//  // Save the new access token to your storage or state
//  localStorage.setItem("tfstoken", response.data.accessToken);
//  localStorage.setItem("tfsUserDetails", JSON.stringify(response.data));
//  return newAccessToken;
// };

// // Add a request interceptor to attach the access token to every request
// jwtInterceptor.interceptors.request.use(
//  async (config) => {
//   // Attach the access token to the request headers
//   // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//   return config;
//  },
//  (error) => {
//   return Promise.reject(error);
//  }
// );

// // Add a response interceptor to handle token expiration and refresh
// jwtInterceptor.interceptors.response.use(
//  (response) => {
//   return response;
//  },
//  async (error) => {
//   const originalRequest = error.config;
//   if ((error.response.status === 500) || (error.response.status === 502)) {
//    Swal.fire({
//     icon: "error",
//     text: "Something went wrong, Please try again later",
//    });
//   }
//   else if (error.response.status === 400) {
//    Swal.fire({
//     icon: "error",
//     text: error.response.data.message,
//    });
//   }
//   // Check if the error is due to an expired token
//   if (error.response.status === 401 && !originalRequest._retry) {
//    originalRequest._retry = true;

//    try {
//     // Refresh the token
//     const newAccessToken = await refreshToken();

//     // Update the original request with the new access token
//     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//     // Retry the original request with the new token
//     return axios(originalRequest);
//    } catch (refreshError) {
//     if (refreshError) {
//      localStorage.clear();
//      window.location.href = "/login";
//      // Swal.fire({
//      //  title: refreshError.message,
//      //  // text: "Do you still want to login again in this tab?",
//      //  icon: "warning",
//      //  showCancelButton: true,
//      //  confirmButtonColor: "#2c4c74",
//      //  cancelButtonColor: "#f36334",
//      //  confirmButtonText: "Login Again",
//      // }).then((result) => {
//      //  if (result.isConfirmed) {
//      //   localStorage.clear();
//      //   window.location.href = "/login";
//      //  }
//      // })
//     }
//     // Handle refresh token error, e.g., redirect to login page
//     console.error('Error refreshing token:', refreshError);
//     // You may want to handle this differently based on your requirements
//     throw refreshError;
//    }
//   }

//   return Promise.reject(error);
//  }
// );

// export default jwtInterceptor;


import axios from 'axios';
import Swal from 'sweetalert2';

// Base URL for the Axios instance
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Create an Axios instance with default settings
const jwtInterceptor = axios.create({
 baseURL: BASE_URL,
});

// Refresh Token Function
const refreshToken = async () => {
 try {
  const userDetails = JSON.parse(localStorage.getItem("tfsUserDetails"));
  if (!userDetails) throw new Error("User details missing");

  const payload = {
   emailId: userDetails.emailId,
   grantType: "refresh",
   refreshToken: userDetails.refreshToken,
  };

  const response = await axios.post(`${BASE_URL}auth/admin/login`, payload);

  const { accessToken } = response.data;

  // Save the new access token and user details
  localStorage.setItem("tfstoken", accessToken);
  localStorage.setItem("tfsUserDetails", JSON.stringify(response.data));

  return accessToken;
 } catch (error) {
  console.error("Error during token refresh:", error);
  throw error;
 }
};

// Request Interceptor
jwtInterceptor.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem("tfstoken");
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 (error) => Promise.reject(error)
);

// Response Interceptor
jwtInterceptor.interceptors.response.use(
 (response) => response,
 async (error) => {
  const originalRequest = error.config;

  // Show error alerts for specific statuses
  if ([500, 502].includes(error.response?.status)) {
   Swal.fire({
    icon: "error",
    text: "Something went wrong, please try again later.",
   });
  } else if (error.response?.status === 400) {
   Swal.fire({
    icon: "error",
    text: error.response.data?.message || "Bad Request",
   });
  }

  // Handle token expiration (401 Unauthorized)
  if (error.response?.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true;

   try {
    // Refresh the token
    const newAccessToken = await refreshToken();

    // Retry the original request with the new token
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return jwtInterceptor(originalRequest);
   } catch (refreshError) {
    console.error("Token refresh failed:", refreshError);

    // Clear session and redirect to login
    localStorage.clear();
    window.location.href = "/login";
    return Promise.reject(refreshError);
   }
  }

  return Promise.reject(error);
 }
);

export default jwtInterceptor;
