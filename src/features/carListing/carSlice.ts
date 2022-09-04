import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCarsApi } from "./carApi";

export interface Car {
  id?: number;
  carMake: string;
  carModel: string;
  carYear: string;
  carPictureUrl: string;
  carSalePrice: number;
  additionalNotes: string;
  addedBy?: string;
  sold?: boolean;
}

export interface CarState {
  allCars: Car[];
}

const initialState: CarState = {
  allCars: [],
};

export const getAllCars = createAsyncThunk(
  "getAllCars",
  async (): Promise<Car[]> => await getAllCarsApi()
);

export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCars.fulfilled, (state, action) => {
      state.allCars = action.payload;
    });
  },
});

export const carReducer = carSlice.reducer;
