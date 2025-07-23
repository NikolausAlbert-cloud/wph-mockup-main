import { getPostDetail, GetUserPostsParams_dataProps } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchPostDetail = createAsyncThunk("posts/fetchPostDetail", async (id:number, { rejectWithValue }) => {
  try {
    const response = await getPostDetail(id);
    return response;
  } catch(err: any) {
     return rejectWithValue(err.response?.data?.message || err.message || "Failed to get post detail.")
  }
});

type initialStateProps = {
  fetchPostDetail_status: "idle" | "loading" | "succeeded" | "failed";
  data: GetUserPostsParams_dataProps;
  error: string | null;
};

const initialState: initialStateProps = {
  fetchPostDetail_status: "idle",
  data: [],
  error: null,
};

const getPostDetailSlice = createSlice({
  name: "getPostDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.fetchPostDetail_status = "loading";
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action:PayloadAction<any>) => {
        state.fetchPostDetail_status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.fetchPostDetail_status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default getPostDetailSlice.reducer;