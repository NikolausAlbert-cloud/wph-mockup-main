import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");
  return token;
}

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOauth: (_, action: PayloadAction<{ id: string; email: string; token: string}>) => {
      console.log("Token received in Redux: ", action.payload.token);
      localStorage.setItem("token", action.payload.token);
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});

export const { loginOauth, logout} = authSlice.actions;
export default authSlice.reducer;