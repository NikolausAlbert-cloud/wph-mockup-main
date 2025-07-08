import { customAxios } from "@/api/customAxios";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { argv } from "process";

export const fecthPublicPostSlice = createAsyncThunk("posts/fetchPublicPost", async (argv, {isRejectedWithValue}) => {
  const repsonse = await customAxios.get("")
})