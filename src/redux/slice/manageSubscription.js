import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};


// export const GetAllSubscriptionPlan = createAsyncThunk('manageSubscription/getAllSubscriptionPlan', async ({ rejectWithValue }) => {
//  try {
//   const response = await jwtInterceptor.get(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/gallery/getAllGallery`)
//   console.log("fghjkl", response)
//   return response.data
//  } catch (err) {
//   if (!err.response) {
//    throw err
//   }
//   return rejectWithValue(err.response.data)
//  }
// })

export const GetAllSubscriptionPlan = createAsyncThunk('manageSubscription/getAllSubscriptionPlan', async () => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}managePlan/getAllSubscriptionPlan`, axiosConfig)
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

export const CreateSubscriptionPlan = createAsyncThunk('manageSubscription/createSubscriptionPlan', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managePlan/createSubscriptionPlan`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const UpdateSubscriptionPlanAction = createAsyncThunk('manageSubscription/updateSubscriptionPlan', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}managePlan/updateSubscriptionPlan`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const DeleteSubscriptionPlan = createAsyncThunk('manageSubscription/deleteSubscriptionPlan', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}managePlan/deleteSubscriptionPlan?planId=${id}`, axiosConfig)
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
 PlanList: [],
 isError: false,
 ErrorMessage: "",
 SubscriptionListUpdated: false,
 updatePlan: {}
}

const manageSubscription = createSlice({
 name: "manageSubscription",
 initialState,
 reducers: {
  subscriptionDataLoading: (state, action) => {
   state.isLoading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllSubscriptionPlan.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscriptionListUpdated = false
   state.PlanList = action.payload
  });
  builder.addCase(GetAllSubscriptionPlan.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(CreateSubscriptionPlan.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscriptionListUpdated = true
  });
  builder.addCase(CreateSubscriptionPlan.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(UpdateSubscriptionPlanAction.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscriptionListUpdated = true
   state.updatePlan = action.payload
  });
  builder.addCase(UpdateSubscriptionPlanAction.rejected, (state, action) => {
   // console.log("Error", action.payload);
   state.ErrorMessage = action.payload.message
   state.isError = true
  });

  builder.addCase(DeleteSubscriptionPlan.fulfilled, (state, action) => {
   state.isLoading = false;
   state.SubscriptionListUpdated = true
  });
  builder.addCase(DeleteSubscriptionPlan.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { subscriptionDataLoading } = manageSubscription.actions;
export default manageSubscription.reducer;