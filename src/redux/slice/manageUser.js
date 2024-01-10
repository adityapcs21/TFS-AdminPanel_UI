import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const GetAllSubscribedUser = createAsyncThunk('blogs/getAllSubscribedUser', async () => {
 const response = await fetch("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/emailSubscribe/getAllSubscriptions", {
  method: "GET",
  headers: { "Authorization": localStorage.getItem("token") }
 });
 return response.json();
})


const initialState = {
 isLoading: false,
 SubscribedUser: {},
 isError: false,
}

const manageUser = createSlice({
 name: "manageUser",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(GetAllSubscribedUser.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscribedUser = action.payload
  });
  builder.addCase(GetAllSubscribedUser.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
 },
})

export default manageUser.reducer;