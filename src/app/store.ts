import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userReducer } from "../features/adminPage/userSlice";
import { carReducer } from "../features/carListing/carSlice";
import counterSlice from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer,
    cars: carReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
