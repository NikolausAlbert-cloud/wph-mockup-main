import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userDataReducer from "./slices/getUserDataSlice";
import userPostsReducer from "./slices/getUserPostsSlice";
import searchPostReducer from "./slices/searchPostSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userDataReducer,
    post: userPostsReducer,
    search: searchPostReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;