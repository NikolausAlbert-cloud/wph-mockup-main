import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {data: any} = {
  data: {}
};

const searchPostSlice = createSlice({
  name: "searchPost",
  initialState,
  reducers: {
    saveSearchPost: (state, action:PayloadAction<any>) => {
      state.data = action.payload;
    }
  }
});

export const { saveSearchPost } = searchPostSlice.actions;
export default searchPostSlice.reducer;