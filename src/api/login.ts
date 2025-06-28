import { SignInFormData } from "@/utils/validation";
import { customAxios } from "./customAxios";
import { MutationFunction } from "@tanstack/react-query";

type LoginParams = {
  payload: SignInFormData;
}

type LoginResponse = {
  token: string;
}

export const postLogin: MutationFunction<LoginResponse, LoginParams> = async ({ payload }) => {
  const response = await customAxios.post<LoginResponse>("/auth/login", payload);
  return response.data;
}