import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/auth';
import blogReducer from './slice/blog'

export const store = configureStore({
 reducer: {
  auth: authReducer,
  blog: blogReducer
 }
});