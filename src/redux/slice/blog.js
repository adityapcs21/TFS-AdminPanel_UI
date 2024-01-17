import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
  headers: {
    "Authorization": localStorage.getItem("token")
  }
};

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async () => {
  try {
    const response = await jwtInterceptor.get("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/getAllBlogs")
    return response.data;
  } catch (error) {
    console.error(error);
  }
})

export const SaveBlog = createAsyncThunk('blogs/saveBlog', async (data) => {
  try {
    const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/createBlog", data, axiosConfig)
    return response.data;
  } catch (error) {
    console.log(error)
  }
})

export const UpdateBlog = createAsyncThunk('blogs/updateBlog', async (data) => {
  try {
    const response = await jwtInterceptor.post("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/updateBlog", data, axiosConfig);
    return response.data;
  } catch (error) {
    console.log(error)
  }
})

export const DeleteBlogById = createAsyncThunk('blogs/deleteBlogById', async (id) => {
  try {
    const response = await jwtInterceptor.delete(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/deleteBlog?blogId=${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    console.log(error)
  }
})

const initialState = {
  isLoading: false,
  BlogData: {},
  isError: false,
  newBlogAdded: false,
  isMediaUploading: false
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    mediaIsUploading: (state) => {
      state.isMediaUploading = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BlogData = action.payload
      state.newBlogAdded = false
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true
    })

    // ----------------Save Blog----------------------------
    builder.addCase(SaveBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newBlogAdded = true;
      state.isMediaUploading = false
    });
    builder.addCase(SaveBlog.rejected, (state, action) => {
      state.isError = true
    })

    // ----------------Update Blog----------------------------
    builder.addCase(UpdateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newBlogAdded = true
      state.isMediaUploading = false

    });
    builder.addCase(UpdateBlog.rejected, (state, action) => {
      state.isError = true
    })

    // ----------------delete Blog----------------------------
    builder.addCase(DeleteBlogById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BlogData = action.payload
    });
    builder.addCase(DeleteBlogById.rejected, (state, action) => {
      state.isError = true
    })
  },
})
export const { mediaIsUploading } = blogSlice.actions;
export default blogSlice.reducer;