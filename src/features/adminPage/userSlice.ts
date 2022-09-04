import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLoginApi, doRegisterApi } from "./userApi";

export interface UserResponse {
  token: string;
}

export interface UserRegisterResponse {
  username: string;
  message: string;
}

export interface UserState {
  authenticated: boolean;
  user: UserResponse;
  message: String;
  redirect: String;
}

export interface UserLoginObject {
  username: string;
  password: string;
}

export interface UserRegisterObject {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialState: UserState = {
  authenticated: false,
  user: { token: "" },
  message: "",
  redirect: "",
};

export const doLogin = createAsyncThunk(
  "doLogin",
  async (data: UserLoginObject) => {
    return await doLoginApi(data);
  }
);

export const doRegister = createAsyncThunk(
  "doRegister",
  async (data: UserRegisterObject) => {
    return await doRegisterApi(data);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    clearRedirect: (state) => {
      state.redirect = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
    });

    builder.addCase(doRegister.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.redirect = "/login";
    });
  },
});

export const { clearMessage, clearRedirect } = userSlice.actions;

export const userReducer = userSlice.reducer;
