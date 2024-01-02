import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async () => {
  const response = await fetch("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/getAllBlogs", {
    method: "GET",
  });
  return response.json();
})

export const SaveBlog = createAsyncThunk('blogs/saveBlog', async (data) => {
  const response = await fetch("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/createBlog", {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data),
  });
  return response.json();
})

export const UpdateBlog = createAsyncThunk('blogs/updateBlog', async (data) => {
  const response = await fetch("https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/updateBlog", {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify(data),
  });
  return response.json();
})

export const DeleteBlogById = createAsyncThunk('blogs/deleteBlogById', async (id) => {
  const response = await fetch(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/blog/deleteBlog?blogId=${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
  return response.json();
})

const initialState = {
  isLoading: false,
  BlogData: {},
  isError: false
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.BlogData = action.payload
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true
    })

    // ----------------Save Blog----------------------------
    builder.addCase(SaveBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.BlogData = action.payload
      console.log("action.payload", action.payload)
    });
    builder.addCase(SaveBlog.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true
    })

    // ----------------Update Blog----------------------------
    builder.addCase(UpdateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.BlogData = action.payload
      console.log("action.payload", action.payload)
    });
    builder.addCase(UpdateBlog.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true
    })

    // ----------------delete Blog----------------------------
    builder.addCase(DeleteBlogById.fulfilled, (state, action) => {
      state.isLoading = false;
      // getAllBlogs();
      // state.BlogData = action.payload
      console.log("action.payload", action.payload)
    });
    builder.addCase(DeleteBlogById.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true
    })
  },
})

export default blogSlice.reducer;