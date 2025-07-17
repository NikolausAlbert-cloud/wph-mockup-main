import { GetUserPostsParams_dataProps, searchPosts } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchPostThunk = createAsyncThunk(
  "/searchPostThunk", 
  async (userInput: string, { rejectWithValue }) => {
  try {
    const response = await searchPosts(userInput, 1, 10);
    return response;
  } catch(err: any) {
     return rejectWithValue(err.response?.data?.message || err.message || "Failed to search posts.")
  }
});

type initialStateProps = {
  userInput: string;
  data: GetUserPostsParams_dataProps[];
  searchPostThunk_status: string,
  error: string | null;
}

const initialState: initialStateProps = {
  userInput: "",
  data: [],
  searchPostThunk_status: "idle",
  error: null
};

const searchPostSlice = createSlice({
  name: "searchPost",
  initialState,
  reducers: {
    saveSearchPost: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPostThunk.pending, (state) => {
        state.searchPostThunk_status = "loading";
        state.error = null;
      })
      .addCase(searchPostThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.searchPostThunk_status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(searchPostThunk.rejected, (state, action) => {
        state.searchPostThunk_status = "failed";
        state.error = action.payload as string
      })
  } 
});

export const { saveSearchPost } = searchPostSlice.actions;
export default searchPostSlice.reducer;