import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

//Action
export const login = createAsyncThunk('login', async (data) => {

 const response = await fetch("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/auth/admin/login", {
  method: "POST",
  body: JSON.stringify(data),
 });
 return response.json();
})

const initialState = {
 isLoading: false,
 data: null,
 isError: false
}

const authSlice = createSlice({
 name: "auth",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
   state.isLoading = false;
   state.data = action.payload
   localStorage.setItem("token", action.payload.accessToken);
   localStorage.setItem("userDetails", JSON.stringify(action.payload));
   // window.location = "/"
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

export default authSlice.reducer;