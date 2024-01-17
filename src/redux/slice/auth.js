import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

//Action
export const login = createAsyncThunk('auth/login', async (data) => {
 try {
  const response = await axios.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/auth/admin/login", data);
  return response.data;
 } catch (error) {
  console.error(error);
 }
})



const initialState = {
 isLoading: false,
 data: null,
 isError: false
}

const authSlice = createSlice({
 name: "auth",
 initialState,
 reducers: {
  setUserDetails: (state, action) => {
   state.data = action.payload
  }
 },
 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
   console.log("qwesrdtfyg", action)
   state.isLoading = false;
   state.data = action.payload
   localStorage.setItem("token", action.payload?.accessToken);
   localStorage.setItem("userDetails", JSON.stringify(action.payload));
   window.location.reload()
   // window.location = "/"
  });
  builder.addCase(login.rejected, (state, action) => {
   console.log("qwesrdtfyg rej", action)

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
export const { setUserDetails } = authSlice.actions;
export default authSlice.reducer;