import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const GetAllStudentsList = createAsyncThunk('students/getAllStudents', async (data, thunkApi) => {
 try {
  let token = thunkApi.getState().auth;
  console.log("tokenThunk", token)
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getUsersList`, data, axiosConfig)
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

export const UpdateStudentData = createAsyncThunk('students/updateStudent', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/updateStudent`, data, axiosConfig)
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


export const deleteStudent = createAsyncThunk('students/deleteStudent', async (uniqueId) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/deleteUser?uniqueId=${uniqueId}`)
  return response.data;
 } catch (error) {
  console.error(error);
 }
});


export const BatchUpdateRequestList = createAsyncThunk('students/batchUpdateRequestList', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/batchUpdateRequestList`, data, axiosConfig)
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

export const ProfileUpdateRequestList = createAsyncThunk('students/profileUpdateRequestList', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/profileUpdateRequestList`, data, axiosConfig)
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

export const ApproveProfileUpdateRequest = createAsyncThunk('students/approveProfileUpdateRequest', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/approveProfileUpdateRequest`, data, axiosConfig)
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

export const ApproveBatchUpdateRequest = createAsyncThunk('students/approveBatchUpdateRequest', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/approveBatchUpdateRequest`, data, axiosConfig)
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

export const SendEmailToActiveSubscriptionUsers = createAsyncThunk('students/sendEmailToActiveSubscriptionUsers', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/sendEmailToActiveSubscriptionUsers`, data, axiosConfig)
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
 StudentList: [],
 BatchUpdateList: [],
 ProfileUpdateRequestList: [],
 isError: false,
 StudentsDataUpdated: false
}

const students = createSlice({
 name: "students",
 initialState,
 reducers: {
  StudentDataIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllStudentsList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.StudentsDataUpdated = false
   state.StudentList = action.payload
  });
  builder.addCase(GetAllStudentsList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(UpdateStudentData.fulfilled, (state, action) => {
   state.isLoading = false;
   state.StudentsDataUpdated = true
   state.StudentList = action.payload
  });
  builder.addCase(UpdateStudentData.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(deleteStudent.fulfilled, (state, action) => {
   state.isLoading = false;
   state.StudentsDataUpdated = true
  });
  builder.addCase(deleteStudent.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(BatchUpdateRequestList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.BatchUpdateList = action.payload
  });
  builder.addCase(BatchUpdateRequestList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(ApproveBatchUpdateRequest.fulfilled, (state, action) => {
   state.isLoading = false;
   // state.BatchUpdateList = action.payload
   state.StudentsDataUpdated = true
  });
  builder.addCase(ApproveBatchUpdateRequest.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(ProfileUpdateRequestList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.ProfileUpdateRequestList = action.payload
  });
  builder.addCase(ProfileUpdateRequestList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { StudentDataIsLoading } = students.actions;
export default students.reducer;