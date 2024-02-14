import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
  headers: {
    "Authorization": localStorage.getItem("token")
  }
};

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async (data) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/getAllBlogs`, data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
})

export const SaveBlog = createAsyncThunk('blogs/saveBlog', async (data) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/createBlog`, data, axiosConfig)
    console.log("------", response)
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error)
  }
})

export const UpdateBlog = createAsyncThunk('blogs/updateBlog', async (data) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/updateBlog`, data, axiosConfig);
    return response.data;
  } catch (error) {
    console.log(error)
  }
})

export const DeleteBlogById = createAsyncThunk('blogs/deleteBlogById', async (id) => {
  try {
    const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}blog/deleteBlog?blogId=${id}`, axiosConfig);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error
    }
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
    },
    blogIsLoading: (state, action) => {
      state.isLoading = true;
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
      console.log("errorr", action.payload)
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
export const { mediaIsUploading, blogIsLoading } = blogSlice.actions;
export default blogSlice.reducer;