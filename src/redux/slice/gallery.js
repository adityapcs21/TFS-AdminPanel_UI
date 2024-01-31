import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const GetAllGallery = createAsyncThunk('gallery/getAllGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}gallery/getAllGallery`, data, axiosConfig)
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

export const GetAllVideoGallery = createAsyncThunk('gallery/getAllVideoGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}gallery/getAllGallery`, data, axiosConfig)
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

export const SaveGallery = createAsyncThunk('gallery/createGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}gallery/createGallery`, data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const UpdateGallery = createAsyncThunk('gallery/updateGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}gallery/updateGallery`, data, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const DeleteGalleryById = createAsyncThunk('gallery/deleteGallery', async (id) => {
 try {
  const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}gallery/deleteGallery?galleryId=${id}`, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

const initialState = {
 isLoading: false,
 Gallery: {},
 Video: {},
 isError: false,
 newGalleryAdded: false,
 isMediaUploading: false
}

const gallerySlice = createSlice({
 name: "gallery",
 initialState,
 reducers: {
  galleryIsUpdating: (state) => {
   state.isMediaUploading = true
  },
  galleryLoading: (state, action) => {
   state.isLoading = true;
  }
 },
 extraReducers: (builder) => {
  builder.addCase(GetAllGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.Gallery = action.payload
   state.newGalleryAdded = false
  });
  builder.addCase(GetAllGallery.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  });

  builder.addCase(GetAllVideoGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.Video = action.payload
   state.newGalleryAdded = false
  });
  builder.addCase(GetAllVideoGallery.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
  // ----------------Save Gallery----------------------------
  builder.addCase(SaveGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newGalleryAdded = true;
   state.isMediaUploading = false;
   console.log("action.payload", action.payload)
  });
  builder.addCase(SaveGallery.rejected, (state, action) => {
   console.log(" SaveGallery Error", action.payload);
   state.isError = true
  })

  // ----------------Update Gallery----------------------------
  builder.addCase(UpdateGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newGalleryAdded = true
   state.isMediaUploading = false;
   console.log("action.payload", action.payload)
  });
  builder.addCase(UpdateGallery.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

  // ----------------delete Gallery----------------------------
  builder.addCase(DeleteGalleryById.fulfilled, (state, action) => {
   state.isLoading = false;
   state.Gallery = action.payload
   state.newGalleryAdded = true
   console.log("action.payload", action.payload)
  });
  builder.addCase(DeleteGalleryById.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
 },
})
export const { galleryIsUpdating, galleryLoading } = gallerySlice.actions;

export default gallerySlice.reducer;