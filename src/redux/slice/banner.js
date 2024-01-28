import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const getAllBanner = createAsyncThunk('banner/getAllBanner', async () => {
 try {
  const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}banner/getAllBanners`);
  return response.data;
 } catch (error) {
  console.error(error);
 }
});

export const CreateBanner = createAsyncThunk('banner/createBanner', async () => {
 try {
  const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}banner/uploadBanner`, axiosConfig);
  return response.data;
 } catch (error) {
  console.error(error);
 }
})


export const DeleteBanner = createAsyncThunk('banner/deleteBanner', async (bannerId) => {
 try {
  const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}banner/deleteBanner?bannerId=${bannerId}`, axiosConfig);
  return response.data;
 } catch (error) {
  console.error(error);
 }
})



const initialState = {
 isLoading: false,
 bannerImages: {},
 isError: false,
 isBannerUpdated: false
}

const bannerSlice = createSlice({
 name: "banner",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(getAllBanner.fulfilled, (state, action) => {
   state.bannerImages = action.payload
   state.isLoading = false;
   state.isError = true;
   state.isBannerUpdated = false
  });
  builder.addCase(getAllBanner.rejected, (state, action) => {
   state.isError = true
  })

  builder.addCase(CreateBanner.fulfilled, (state, action) => {
   state.isBannerUpdated = true
   state.isLoading = false;
   state.isError = true
  });
  builder.addCase(CreateBanner.rejected, (state, action) => {
   state.isError = true
  })

  builder.addCase(DeleteBanner.fulfilled, (state, action) => {
   state.isBannerUpdated = true
   state.isLoading = false;
   state.isError = true
  });
  builder.addCase(DeleteBanner.rejected, (state, action) => {
   state.isError = true
  })

 },

})

export default bannerSlice.reducer;