import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userDataReducer from "./slices/getUserDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userDataReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;