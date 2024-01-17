import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import blogReducer from './slice/blog';
import subscribedUserReducer from './slice/subscribedUser';
import mediaUploadReducer from './slice/mediaUpload'
import manageAdminUser from './slice/manageUser';
import galleryReducer from './slice/gallery'

export const store = configureStore({
 reducer: {
  auth: authReducer,
  blog: blogReducer,
  subscribedUser: subscribedUserReducer,
  mediaUpload: mediaUploadReducer,
  manageUser: manageAdminUser,
  gallery: galleryReducer
 }
});