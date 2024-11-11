import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("tfstoken")
 }
};

export const GetAllPendingKYCList = createAsyncThunk('managerUser/student/getKycPendingUsersList', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/getKycPendingUsersList`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const KycAction = createAsyncThunk('managerUser/student/kycAction', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managerUser/student/kycAction`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})


export const GetS3Image = createAsyncThunk('managerUser/student/getS3SignedURL', async (imageUrl, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}getSignedUrl?mediaType=getDoc&fileName=${imageUrl}`, axiosConfig)
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
 allKycList: {},
 kycUpdated: false,
 activeId: "",
 userData: {}
}

const manageKycApproval = createSlice({
 name: "manageKycApproval",
 initialState,
 reducers: {
  kycListIsLoading: (state, action) => {
   state.isLoading = true
  },
  kycUpdating: (state, action) => {
   state.kycUpdated = true
  },
  activePendingId: (state, action) => {
   state.activeId = action.payload
   console.log(current(state))
   if(state.allKycList && state.allKycList.userList && state.allKycList.userList.length > 0){    
    let data = state.allKycList.userList.find((item) => item.userId = action.payload)
    state.userData = data
   }
  }
 },
 extraReducers: (builder) => {

  builder.addCase(GetAllPendingKYCList.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allKycList = action.payload
   state.kycUpdated = false;
  });
  builder.addCase(GetAllPendingKYCList.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
   state.kycUpdated = false;
  });

 },
})
export const { kycListIsLoading, kycUpdating, activePendingId } = manageKycApproval.actions;

export default manageKycApproval.reducer;