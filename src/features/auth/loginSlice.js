import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicPost } from "../../utils/apiCaller"

const userLogin = async (data) => {
  const response = await publicPost("/auth/login", data);
  return response;
}

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  error: '',
}
export const createUserLogin = createAsyncThunk(
  "user/login",
  async (data) => {
    const user = await userLogin(data);
    return user;
  }
);

// create slice
const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
   builder
    .addCase(createUserLogin.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    }) 
    .addCase(createUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = ''
    })
    .addCase(createUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.user = {};
    })
  }
});

export default loginSlice.reducer;
export const {login, logout} = loginSlice.actions; 