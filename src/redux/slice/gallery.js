import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const GetAllGallery = createAsyncThunk('gallery/getAllGallery', async (type) => {
 try {
  const response = await jwtInterceptor.get(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/gallery/getAllGallery?type=${type}`)
  return response.data;
 } catch (error) {
  console.error(error);
 }
})

export const SaveGallery = createAsyncThunk('gallery/createGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/gallery/createGallery", data, axiosConfig)
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const UpdateGallery = createAsyncThunk('gallery/updateGallery', async (data) => {
 try {
  const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/gallery/updateGallery", data, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

export const DeleteGalleryById = createAsyncThunk('gallery/deleteGallery', async (id) => {
 try {
  const response = await jwtInterceptor.delete(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/gallery/deleteGallery?galleryId=${id}`, axiosConfig);
  return response.data;
 } catch (error) {
  console.log(error)
 }
})

const initialState = {
 isLoading: false,
 Gallery: {},
 isError: false,
 newGalleryAdded: false
}

const gallerySlice = createSlice({
 name: "gallery",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(GetAllGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.Gallery = action.payload
   state.newGalleryAdded = false
  });
  builder.addCase(GetAllGallery.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })

  // ----------------Save Gallery----------------------------
  builder.addCase(SaveGallery.fulfilled, (state, action) => {
   state.isLoading = false;
   state.newGalleryAdded = true;
   // state.Gallery = action.payload
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
   // state.Gallery = action.payload
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
   console.log("action.payload", action.payload)
  });
  builder.addCase(DeleteGalleryById.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
 },
})

export default gallerySlice.reducer;