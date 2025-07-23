import { CommentProps, getComment, NewCommentProps, postComment } from "@/api/comments";
import { } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchComment = createAsyncThunk("fetchComment", async (postId: number, { rejectWithValue }) => {
  try {
    const response = await getComment(postId);
    return response;
  } catch(err: any) {
     return rejectWithValue(err.response?.data?.message || err.message || "Failed to get comment.")
  }
});

type initialStateProps = {
  fetchComment_status: "idle" | "loading" | "succeeded" | "failed";
  data: CommentProps[];
  error: string | null;
};

const initialState: initialStateProps = {
  fetchComment_status: "idle",
  data: [],
  error: null,
};

const commentSlice = createSlice({
  name: "fetchComment",
  initialState,
  reducers: {
    addComment: (_, action: PayloadAction<NewCommentProps>) => {
      postComment(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComment.pending, (state) => {
        state.fetchComment_status = "loading";
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action:PayloadAction<any>) => {
        state.fetchComment_status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.fetchComment_status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;