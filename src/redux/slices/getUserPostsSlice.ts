import { getUserPosts, getUserPostsParams, getUserPostsParams_dataProps, getUserPostsResponse } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const fetchUserPosts = createAsyncThunk ("users/fetchUserPosts", async ({ payload }: getUserPostsParams, {rejectWithValue}) => {
  try {
    const response: getUserPostsResponse = await getUserPosts({ payload });
    return response;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || "Failed to fetch user posts.")
  };
});

type InitialState_data = {
  data: getUserPostsParams_dataProps[],
  total: number,
  page: number,
  lastPage: number
};

type InitialStateType = {
  fetchUserPosts_status: "idle" | "loading" | "succeeded" | "failed";
  data: InitialState_data,
  error: string | null;
};

const initialState: InitialStateType = {
  fetchUserPosts_status: "idle",
  data: {
    data: [],
    total: 0,
    page: 1,
    lastPage: 1
  },
  error: null
}

const getUserPostsSlice = createSlice({
  name: "getUserPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.
      addCase(fetchUserPosts.pending, (state) => {
        state.fetchUserPosts_status = "loading";
        state.error = null;
      })
      addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<getUserPostsResponse>) => {
        state.fetchUserPosts_status = "succeeded";
        state.data.data = action.payload.data;
        state.data.total = action.payload.total;
        state.data.page = action.payload.page;
        state.data.lastPage = action.payload.lastPage;
      })
      addCase(fetchUserPosts.rejected, (state, action) => {
        state.fetchUserPosts_status = "failed";
        state.error = action.payload as string
      })
  } 
});

export default getUserPostsSlice.reducer;