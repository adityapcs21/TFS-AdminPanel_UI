import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

//Action
export const fetchtodos = createAsyncThunk('fetchTodos', async () => {
 const response = await fetch("https://jsonplaceholder.typicode.com/todos");
 return response.json();
})

const initialState= {
 isLoading: false,
 data: null,
 isError: false
}

const authSlice = createSlice({
 name: "auth",
 initialState,
 extraReducers: (builder) => {
  builder.addCase(fetchtodos.fulfilled, (state, action) => {
   state.isLoading = false;
   state.data = action.payload
  });
  builder.addCase(fetchtodos.rejected, (state, action) => {
   console.log("Error", action.payload);
   state.isError = true
  })
 },

})

export default authSlice.reducer;