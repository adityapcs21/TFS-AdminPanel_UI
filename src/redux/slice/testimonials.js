import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const GetAllTestimonials = createAsyncThunk('managerUser/student/getAllTestimonials', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getAllTestimonials`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const TestimonialAction = createAsyncThunk('managerUser/student/testimonialAction', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/testimonialAction`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})



const initialState = {
 isLoading: false,
 isError: false,
 allTestimonials: [],
 testimonialUpdated: false,
}

const manageTestimonials = createSlice({
 name: "manageTestimonials",
 initialState,
 reducers: {
  testimonialIsLoading: (state, action) => {
   state.isLoading = true
  },
  testimonialUpdating: (state, action) => {
   state.testimonialUpdated = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(TestimonialAction.fulfilled, (state, action) => {
   state.isLoading = false;
   state.testimonialUpdated = true;
  });
  builder.addCase(TestimonialAction.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true;
   state.testimonialUpdated = false;
  });


  builder.addCase(GetAllTestimonials.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allTestimonials = action.payload
   state.testimonialUpdated = false;
  });
  builder.addCase(GetAllTestimonials.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.testimonialUpdated = false;
  });

 },
})
export const { testimonialIsLoading, testimonialUpdating } = manageTestimonials.actions;

export default manageTestimonials.reducer;