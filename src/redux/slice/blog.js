import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jwtInterceptor from "../../helpers/jwtInterceptors";

let axiosConfig = {
  headers: {
    "Authorization": localStorage.getItem("token")
  }
};

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async (data, { rejectWithValue }) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/getAllBlogs`, data)
    return response.data
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const SaveBlog = createAsyncThunk('blogs/saveBlog', async (data, { rejectWithValue }) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/createBlog`, data, axiosConfig)
    return response.data
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const UpdateBlog = createAsyncThunk('blogs/updateBlog', async (data, { rejectWithValue }) => {
  try {
    const response = await jwtInterceptor.post(`${process.env.REACT_APP_API_ENDPOINT}blog/updateBlog`, data, axiosConfig);
    return response.data
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
})

export const DeleteBlogById = createAsyncThunk('blogs/deleteBlogById', async (id, { rejectWithValue }) => {
  try {
    const response = await jwtInterceptor.delete(`${process.env.REACT_APP_API_ENDPOINT}blog/deleteBlog?blogId=${id}`, axiosConfig);
    return response.data
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
});

export const GetBlogDetails = createAsyncThunk('blogs/getBlogDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}blog/getBlogDetails?blogId=${id}`);
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
  BlogData: {},
  isError: false,
  newBlogAdded: false,
  isMediaUploading: false,
  BlogDetails: {}
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
    //------------------------blog details-----------------------------
    builder.addCase(GetBlogDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BlogDetails = action.payload
    });
    builder.addCase(GetBlogDetails.rejected, (state, action) => {
      state.isError = true
    })
  },
})
export const { mediaIsUploading, blogIsLoading } = blogSlice.actions;
export default blogSlice.reducer;