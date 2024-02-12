import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from "../../utils/apiCaller";

const addUser = async (data) => {
  const response = await publicPost("/auth/signup", data);
  return response;
};

const initialState = {
  register: {},
  isLoading: false,
  isError: false,
  succes: false,
  error: '',
}
export const createUser = createAsyncThunk(
  "user/register",
  async (data) => {
    const user = await addUser(data);
    return user;
  }
);

// create slice
const regSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
   builder
    .addCase(createUser.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    }) 
    .addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.register = action.payload;
      state.succes = true;
      state.error = ''
    })
    .addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.register = {};
    })
  }
});

export default regSlice.reducer;
