import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const GetMyAssignedUsers = createAsyncThunk('managerUser/student/getMyAssignedUsers', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getMyAssignedUsers`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const GetAllAssignments = createAsyncThunk('managerUser/student/getAllAssignments', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getAllAssignments`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const GetBuddyActionsList = createAsyncThunk('managerUser/student/getBuddyActionsList', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getBuddyActionsList?studentId=${id}`, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const AssignBuddy = createAsyncThunk('managerUser/student/assignBuddy', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/assignBuddy`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const AddBuddyAction = createAsyncThunk('managerUser/student/addBuddyAction', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/addBuddyAction`, data, axiosConfig)
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
 AssignedUserList: [],
 ErrorMessage: "",
 AssignmentList: [],
 updatePlan: {},
 ListUpdated: false
}

const buddyAssignment = createSlice({
 name: "buddyAssignment",
 initialState,
 reducers: {
  buddyAssignmentIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetMyAssignedUsers.fulfilled, (state, action) => {
   state.isLoading = false;
   state.AssignedUserList = action.payload
   state.ListUpdated = false
  });
  builder.addCase(GetMyAssignedUsers.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.ListUpdated = false
  });



  builder.addCase(GetAllAssignments.fulfilled, (state, action) => {
   state.isLoading = false;
   state.AssignmentList = action.payload
   state.ListUpdated = false
  });
  builder.addCase(GetAllAssignments.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(GetBuddyActionsList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.BuddyActionList = action.payload
   state.ListUpdated = false
  });
  builder.addCase(GetBuddyActionsList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(AddBuddyAction.fulfilled, (state, action) => {
   state.isLoading = false;
   state.ListUpdated = true
  });
  builder.addCase(AddBuddyAction.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { buddyAssignmentIsLoading } = buddyAssignment.actions;
export default buddyAssignment.reducer;