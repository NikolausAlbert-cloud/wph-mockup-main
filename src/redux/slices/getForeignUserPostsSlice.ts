import { ForeignUserInfoProps, getForeignUserPosts, GetForeignUserPostsParams, GetUserPostsParams_dataProps, GetUserPostsResponse } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const fetchForeignUserPosts = createAsyncThunk("fetchForeignUserPosts", async ({ payload }: GetForeignUserPostsParams, { rejectWithValue }) => {
  try {
    const response = await getForeignUserPosts({ payload });
    return response;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || "Failed to fetch foreign user posts.");
  }
});

type InitialState_data = {
  data: GetUserPostsParams_dataProps[];
  total: number;
  page: number;
  lastPage: number;
  user: ForeignUserInfoProps;
};

type InitialStateType = {
  fetchForeignUserPosts_status: "idle" | "loading" | "succeeded" | "failed";
  data: InitialState_data;
  error: string | null;
};

const initialState: InitialStateType = {
  fetchForeignUserPosts_status: "idle",
  data: {
    data: [],
    total: 0,
    page: 1,
    lastPage: 1,
    user: {} as ForeignUserInfoProps
  },
  error: null
}

const getForeignUserPostsSlice = createSlice({
  name: "getForeignUserPosts",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchForeignUserPosts.pending, (state: RootState) => {
        state.fetchForeignUserPosts_status = "loading";
        state.error = null;
      })
      .addCase(fetchForeignUserPosts.fulfilled, (state: RootState, action: PayloadAction<GetUserPostsResponse & ForeignUserInfoProps>) => {
        state.fetchForeignUserPosts_status = "succeeded";
        state.data.data = action.payload.data;
        state.data.total = action.payload.total;
        state.data.page = action.payload.page;
        state.data.lastPage = action.payload.lastPage;
        state.data.user = action.payload.user;
      })
      .addCase(fetchForeignUserPosts.rejected, (state: RootState, action: PayloadAction<any>) => {
        state.fetchForeignUserPosts_status = "failed";
        state.error = action.payload as string;
      })
  }
});

export { fetchForeignUserPosts };
export default getForeignUserPostsSlice.reducer;