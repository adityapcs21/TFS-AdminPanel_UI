import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const GetAllSubscribedUser = createAsyncThunk('subscribedUser/getAllSubscribedUser', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}emailSubscribe/getAllSubscriptions`, data, axiosConfig)
  if (response && response.status === 200) {
   return response.data
  } else {
   console.log(response)
   return
  }
 } catch (error) {
  console.log("error", error)
  return
 }
})

export const UnsubscribeUser = createAsyncThunk('subscribedUser/unsubscribe', async (emailId) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}emailSubscribe/unsubscribe?emailId=${emailId}`)
  return response.data;
 } catch (error) {
  console.error(error);
 }
})


const initialState = {
 isLoading: false,
 SubscribedUser: [],
 isError: false,
 SubscribedUserUpdated: false
}

const subscribedUser = createSlice({
 name: "subscribedUser",
 initialState,
 reducers: {
  subscribedUserIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllSubscribedUser.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscribedUserUpdated = false
   state.SubscribedUser = action.payload
  });
  builder.addCase(GetAllSubscribedUser.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(UnsubscribeUser.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscribedUserUpdated = true
  });
  builder.addCase(UnsubscribeUser.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });
 },
})
export const { subscribedUserIsLoading } = subscribedUser.actions;
export default subscribedUser.reducer;