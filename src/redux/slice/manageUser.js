import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const GetAllUserList = createAsyncThunk('manageUser/getUsersList', async () => {
 try {
  const response = await jwtInterceptor.get("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/managerUser/admin/getUsersList", axiosConfig)
  if (response && response.status === 200) {
   return response.data;
  }
  else {
   console.log(response)
  }
 } catch (error) {
  console.log(error)
 }
})


export const CreateAdminUser = createAsyncThunk('manageUser/createUser', async (data) => {
 try {
  const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/managerUser/admin/createUser", data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const UpdateAdminUser = createAsyncThunk('manageUser/updateUser', async (data) => {
 try {
  const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/managerUser/admin/updateUser", data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const DeleteAdminById = createAsyncThunk('manageUser/deleteUser', async (emailId) => {
 try {
  const response = await jwtInterceptor.delete(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/managerUser/admin/deleteUser?emailId=${emailId}`, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
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
 extraReducers: (builder) => {
  builder.addCase(GetAllUserList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.UserUpdated = false
   state.UserList = action.payload.userList
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
 },
})

export default manageUser.reducer;