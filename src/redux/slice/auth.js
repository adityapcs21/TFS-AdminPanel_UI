import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("tfstoken")
 }
};
//Action
export const login = createAsyncThunk('auth/login', async (data) => {
 try {
  const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}auth/admin/login`, data);
  localStorage.setItem("tfstoken", response.data.accessToken);
  localStorage.setItem("tfsUserDetails", JSON.stringify(response.data));
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

//Action
export const DashBoardInfo = createAsyncThunk('auth/dashboardInnfo', async () => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}dashboard/cards`, axiosConfig);
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

export const logoutAdmin = createAsyncThunk('}managerUser/admin/logout', async () => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/logout`, axiosConfig);
  return response.data;
 } catch (error) {
  console.error(error);
 }
})


const initialState = {
 isLoading: false,
 data: null,
 isError: false,
 token: localStorage.getItem("tfstoken"),
 dashboardInfo: []
}

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
  setUserDetails: (state, action) => {
   state.data = action.payload
  },
  setUserToken: (state, action) => {
   state.token = action.payload
  },
  setIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
   if (action.payload?.passwordChangeRequired) {
    state.isLoading = false;
    state.data = action.payload
    localStorage.setItem("tfsUserDetails", JSON.stringify(action.payload));
    window.location.reload()
   } else {
    localStorage.setItem("tfsUserDetails", JSON.stringify(action.payload));
   }
  });
  builder.addCase(login.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

  builder.addCase(DashBoardInfo.fulfilled, (state, action) => {
   state.dashboardInfo = action.payload;
   state.isLoading = false
  });
  builder.addCase(DashBoardInfo.rejected, (state, action) => {
   state.isError = false
  })
 }
})
export const { setUserDetails, setUserToken, setIsLoading } = authSlice.actions;
export default authSlice.reducer;