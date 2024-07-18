import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("tfstoken")
 }
};

export const GetAllBatches = createAsyncThunk('batch/list', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}batch/list`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const CreateBatch = createAsyncThunk('batch/create', async (payload, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}batch/create`, payload, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const DeleteBatch = createAsyncThunk('batch/delete', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}batch/delete?id=${id}`, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})


export const UpdateBatch = createAsyncThunk('batch/update', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}batch/update`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})


export const SendBatchEmail = createAsyncThunk('batch/sendEmailUpdate', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}batch/sendEmailUpdate`, data, axiosConfig)
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
 batchList: [],
 batchIsUpdated: false,
}

const manageBatch = createSlice({
 name: "manageBatch",
 initialState,
 reducers: {
  batchIsLoading: (state, action) => {
   state.isLoading = true
  },
  batchDataIsUpdated: (state, action) => {
   state.batchIsUpdated = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllBatches.fulfilled, (state, action) => {
   state.isLoading = false;
   state.batchList = action.payload
   state.batchIsUpdated = false
  });
  builder.addCase(GetAllBatches.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true;
   state.batchIsUpdated = false
  });


  builder.addCase(CreateBatch.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newEventAdded = true;
   state.batchIsUpdated = true
  });
  builder.addCase(CreateBatch.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.batchIsUpdated = false
  });


  builder.addCase(DeleteBatch.fulfilled, (state, action) => {
   state.isLoading = false;
   state.batchIsUpdated = true
  });
  builder.addCase(DeleteBatch.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.batchIsUpdated = false
  });


  builder.addCase(UpdateBatch.fulfilled, (state, action) => {
   state.isLoading = false;
   state.batchIsUpdated = false
  });
  builder.addCase(UpdateBatch.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { batchIsLoading, batchDataIsUpdated } = manageBatch.actions;

export default manageBatch.reducer;