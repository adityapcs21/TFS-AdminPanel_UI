import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const AddEvent = createAsyncThunk('event/addEvent', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}event/addEvent`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const DeleteEvent = createAsyncThunk('event/deleteEvent', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}event/deleteEvent?eventId=${id}`, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const GetEventDetails = createAsyncThunk('event/getEventDetails', async (id, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}event/getEventDetails?eventId=${id}`, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const GetAllEvents = createAsyncThunk('event/getAllEvents', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}event/getAllEvents`, data, axiosConfig)
  return response.data
 } catch (err) {
  if (!err.response) {
   throw err
  }
  return rejectWithValue(err.response.data)
 }
})

export const EditEvent = createAsyncThunk('event/editEvent', async (data, { rejectWithValue }) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}event/editEvent`, data, axiosConfig)
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
 allEvents: [],
 eventDetails: {},
 mediaUploading: false,
 newEventAdded: false
}

const manageEvent = createSlice({
 name: "manageEvent",
 initialState,
 reducers: {
  eventIsLoading: (state, action) => {
   state.isLoading = true
  },
  mediaIsLoading: (state, action) => {
   state.mediaUploading = true
  }
 },
 extraReducers: (builder) => {
  builder.addCase(AddEvent.fulfilled, (state, action) => {
   state.isLoading = false;
   state.mediaUploading = false;
   state.newEventAdded = true;
  });
  builder.addCase(AddEvent.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true;
   state.mediaUploading = false;
  });


  builder.addCase(DeleteEvent.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newEventAdded = true;
  });
  builder.addCase(DeleteEvent.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(GetEventDetails.fulfilled, (state, action) => {
   state.isLoading = false;
   state.eventDetails = action.payload
  });
  builder.addCase(GetEventDetails.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(GetAllEvents.fulfilled, (state, action) => {
   state.isLoading = false;
   state.allEvents = action.payload
   state.newEventAdded = false;

  });
  builder.addCase(GetAllEvents.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });


  builder.addCase(EditEvent.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newEventAdded = true;
  });
  builder.addCase(EditEvent.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

 },
})
export const { eventIsLoading, mediaIsLoading } = manageEvent.actions;

export default manageEvent.reducer;