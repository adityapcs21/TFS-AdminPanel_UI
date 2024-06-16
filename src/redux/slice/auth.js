import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

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


const initialState = {
 isLoading: false,
 data: null,
 isError: false,
 token: localStorage.getItem("tfstoken")
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
  }
 },
 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
   if (action.payload?.passwordChangeRequired) {
    state.isLoading = false;
    state.data = action.payload
    // localStorage.setItem("tfstoken", action.payload?.accessToken);
    localStorage.setItem("tfsUserDetails", JSON.stringify(action.payload));
    window.location.reload()
   } else {
    localStorage.setItem("tfsUserDetails", JSON.stringify(action.payload));
    // window.location.reload()
   }

  });
  builder.addCase(login.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
 },

 // reducers: {
 //  login: (state, action) => {


 //  },
 //  register: () => {

 //  }
 // }

})
export const { setUserDetails, setUserToken } = authSlice.actions;
export default authSlice.reducer;