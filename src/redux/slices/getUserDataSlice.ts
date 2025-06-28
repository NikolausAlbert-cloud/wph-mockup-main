import { getUserData } from "@/api/getUserData";
import { GetUserDataType } from "@/utils/validation";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const getUserEmail_fromStorage = (): string | null => {
  const response = localStorage.getItem("user");
  return response;
};

export const fetchUserData = createAsyncThunk("users/fetchUserData", async (arg, {rejectWithValue}) => {
  try {
    const email = getUserEmail_fromStorage();
    
    if (!email) {
      return rejectWithValue("No user email found in storage.")
    }
    const response: GetUserDataType = await getUserData({ email });
    
    return response;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || "Failed to fetch user data.")
  }
})

type PreDataProps = GetUserDataType & {
  headline: string;
  avatarUrl?: string;
};

type DataProps = Omit<PreDataProps, 'password'>;

type InitialUserStateType = {
  fetchUserData_status: "idle" | "loading" | "succeeded" | "failed";
  data: DataProps;
  error: string | null;
}

const initialState: InitialUserStateType = {
  fetchUserData_status: "idle",
  data: {
    id: "",
    name: "",
    email: "",
    headline: "Frontend Developer",
    avatarUrl: "",
  },
  error: null
};

const getUserDataSlice = createSlice({
  name: "getUserData",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = initialState.data; // Reset user data
      state.fetchUserData_status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(fetchUserData.pending, (state) => {
        state.fetchUserData_status = "loading";
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action:PayloadAction<DataProps>) => {
        state.fetchUserData_status = "succeeded";
        state.data = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          headline: action.payload.headline ? action.payload.headline : "Frontend Developer",
          avatarUrl: action.payload.avatarUrl || "",
        };
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.fetchUserData_status = "failed";
        state.error = action.payload as string
      })
  }
});

export const { clearUserData } = getUserDataSlice.actions;
export default getUserDataSlice.reducer;