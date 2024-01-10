import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import blogReducer from './slice/blog';
import manageUser from './slice/manageUser';

export const store = configureStore({
 reducer: {
  auth: authReducer,
  blog: blogReducer,
  manageUser: manageUser
 }
});