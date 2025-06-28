import { SignUpFormData, SignUpFormResponse } from "@/utils/validation"
import { MutationFunction } from "@tanstack/react-query";
import { customAxios } from "./customAxios";

type RegisterParams = {
  payload: SignUpFormData;
}

export const postRegister: MutationFunction<SignUpFormResponse, RegisterParams> = async ({ payload }) => {
  console.log("Sending registration request with payload:", payload);
  
  const response = await customAxios.post<SignUpFormResponse>("/auth/register", payload);
  return response.data;
};