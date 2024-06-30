import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("tfstoken")
 }
};

export const GetAllAbout = createAsyncThunk('aboutUs/getAll', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}aboutUs/getAll`, data)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const CreateAbout = createAsyncThunk('aboutUs/create', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}aboutUs/create`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})


export const UpdateAboutUs = createAsyncThunk('aboutUs/update', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}aboutUs/update`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const DeleteAbout = createAsyncThunk('aboutUs/delete', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}aboutUs/delete?contentId=${id}`, axiosConfig);
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
});



const initialState = {
 isLoading: false,
 isError: false,
 allAbout: [],
 allAboutUpdated: false,
}

const manageAbout = createSlice({
 name: "manageAbout",
 initialState,
 reducers: {
  allAboutIsLoading: (state, action) => {
   state.isLoading = true
  },
  aboutUpdating: (state, action) => {
   state.allAboutUpdated = true
  },
 },
 extraReducers: (builder) => {

  builder.addCase(GetAllAbout.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allAbout = action.payload
   state.allAboutUpdated = false;
  });
  builder.addCase(GetAllAbout.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.allAboutUpdated = false;
  });

  builder.addCase(CreateAbout.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allAboutUpdated = true;
  });
  builder.addCase(CreateAbout.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(UpdateAboutUs.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allAboutUpdated = true;
  });
  builder.addCase(UpdateAboutUs.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(DeleteAbout.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allAboutUpdated = true;
  });
  builder.addCase(DeleteAbout.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });
 },
})
export const { allAboutIsLoading, aboutUpdating } = manageAbout.actions;

export default manageAbout.reducer;