import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Car } from "../carListing/carSlice";
import {
  addAdminCarApi,
  doLoginApi,
  doRegisterApi,
  getAdminCarsApi,
} from "./userApi";

export interface User {
  username: string;
  name: string;
}

export interface UserRegisterResponse {
  username: string;
  message: string;
}

export interface UserLoginResponse {
  token: string;
  message: string;
  user: User;
}

export interface UserState {
  authenticated: boolean;
  user: User;
  message: string;
  redirect: String;
  token: string;
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

export interface AddAdminCarResponse {
  message: string;
}

const initialState: UserState = {
  authenticated: false,
  user: { username: "", name: "" },
  message: "",
  redirect: "",
  token: "",
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

export const getAdminCars = createAsyncThunk("getAdminCars", async () => {
  return await getAdminCarsApi();
});

export const addAdminCar = createAsyncThunk("addAdminCar", async (car: Car) => {
  return await addAdminCarApi(car);
});

const getInitialState = () => {
  let storedToken = localStorage.getItem("token");
  let storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    initialState.token = storedToken;
    initialState.user = JSON.parse(storedUser);
    initialState.authenticated = true;
  }

  return initialState;
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
    clearRedirect: (state) => {
      state.redirect = "";
    },
    doLogOut: (state) => {
      localStorage.clear();
      state.authenticated = false;
      state.token = "";
      state.message = "See you Again !!!";
      state.redirect = "/";
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);

      state.authenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.redirect = "/admin";
    });

    builder.addCase(doRegister.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.redirect = "/login";
    });

    builder.addCase(addAdminCar.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
  },
});

export const { clearMessage, clearRedirect, doLogOut } = userSlice.actions;

export const userReducer = userSlice.reducer;
