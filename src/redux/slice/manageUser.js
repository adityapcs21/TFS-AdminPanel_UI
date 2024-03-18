import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const GetAllUserList = createAsyncThunk('manageUser/getUsersList', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/getUsersList`, data, axiosConfig)
  return response.data;

 } catch (error) {
  console.log(error)
 }
})


export const CreateAdminUser = createAsyncThunk('manageUser/createUser', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/createUser`, data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const UpdateAdminUser = createAsyncThunk('manageUser/updateUser', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/updateUser`, data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const DeleteAdminById = createAsyncThunk('manageUser/deleteUser', async (emailId) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/deleteUser?emailId=${emailId}`, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const UnlockAdmin = createAsyncThunk('manageUser/unlockAdmin', async (emailId, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}managerUser/admin/unlock?emailId=${emailId}`, axiosConfig);
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
 UserList: [],
 isError: false,
 UserUpdated: false
}

const manageUser = createSlice({
 name: "manageUser",
 initialState,
 reducers: {
  manageAdminIsLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllUserList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.UserUpdated = false
   state.UserList = action.payload
  });
  builder.addCase(GetAllUserList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

  // ----------------create Admin----------------------------
  builder.addCase(CreateAdminUser.fulfilled, (state, action) => {
   state.isLoading = false;
   state.UserUpdated = true
  });
  builder.addCase(CreateAdminUser.rejected, (state, action) => {
   console.log(" managerUser Error", action.payload);
   state.isError = true
  })

  // ----------------Update Admin----------------------------
  builder.addCase(UpdateAdminUser.fulfilled, (state, action) => {
   state.isLoading = false;
   state.UserUpdated = true
   console.log("action.payload", action.payload)
  });
  builder.addCase(UpdateAdminUser.rejected, (state, action) => {
   console.log(" managerUser Error", action.payload);
   state.isError = true
  })

  // ----------------delete Admin----------------------------
  builder.addCase(DeleteAdminById.fulfilled, (state, action) => {
   state.isLoading = false;
   state.UserUpdated = true;
   console.log("action.payload", action.payload)
  });
  builder.addCase(DeleteAdminById.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

  builder.addCase(UnlockAdmin.fulfilled, (state, action) => {
   state.isLoading = false;
  });
  builder.addCase(UnlockAdmin.rejected, (state, action) => {
   state.isError = true
  })
 },
})
export const { manageAdminIsLoading } = manageUser.actions;
export default manageUser.reducer;