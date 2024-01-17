import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";


let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};
export const getS3SignedUrl = createAsyncThunk('mediaUpload/GetS3SignedUrl', async (data) => {
 try {
  const response = await jwtInterceptor.get(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/getSignedUrl?mediaType=${data.mediaType}&fileName=${data.fileName}`, axiosConfig);
  if (response.data) {
   let filee = data.file
   let Url = response.data.data.s3SignedUrl
   let response2 = await jwtInterceptor.put(Url, filee)
   console.log("respome", response2)
   if (response2 && response.status === 200) {
    return response.data.data.url
   }
  }
 } catch (error) {
  console.error(error);
  return error
 }
})



const initialState = {
 isLoading: false,
 data: null,
 isError: false
}

const authSlice = createSlice({
 name: "mediaUpload",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(getS3SignedUrl.fulfilled, (state, action) => {
   console.log("qwesrdtfyg", action.payload)
   state.isLoading = false;
   state.data = action.payload

  });
  builder.addCase(getS3SignedUrl.rejected, (state, action) => {

   state.isError = true
  })
 },

})

export default authSlice.reducer;