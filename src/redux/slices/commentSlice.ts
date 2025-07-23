import { CommentProps, getComment, NewCommentProps, postComment } from "@/api/comments";
import { } from "@/api/posts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

const fetchComment = createAsyncThunk("comments/fetchComment", async (postId: number, { rejectWithValue }) => {
  try {
    const response = await getComment(postId);
    return response;
  } catch(err: any) {
     return rejectWithValue(err.response?.data?.message || err.message || "Failed to get comment.")
  }
});

const addComment = createAsyncThunk("comments/addComment", async (payload: NewCommentProps["payload"], {rejectWithValue}) => {
  try {
    const response = await postComment({ payload });
    return response;
  } catch(err: any) {
    return rejectWithValue(err.response?.data?.message || err.message || "Failed to add comment.");
  }
});

type initialStateProps = {
  fetchComment_status: "idle" | "loading" | "succeeded" | "failed";
  data: CommentProps[];
  fetchError: string | null;
  addComment_status: "idle" | "loading" | "succeeded" | "failed";
  addCommentError: string | null;
};

const initialState: initialStateProps = {
  fetchComment_status: "idle",
  data: [],
  fetchError: null,
  addComment_status: "idle",
  addCommentError: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fechComment
      .addCase(fetchComment.pending, (state) => {
        state.fetchComment_status = "loading";
        state.fetchError = null;
      })
      .addCase(fetchComment.fulfilled, (state, action:PayloadAction<any>) => {
        state.fetchComment_status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.fetchComment_status = "failed";
        state.fetchError = action.payload as string;
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.addComment_status = "loading";
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action:PayloadAction<any>) => {
        state.addComment_status = "succeeded";
        state.data = [action.payload, ...state.data || []];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addComment_status = "failed";
        state.addCommentError = action.payload as string;
      })
  },
});

export { fetchComment, addComment };
export default commentSlice.reducer;