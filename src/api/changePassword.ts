import { ChangePasswordData } from "@/utils/validation"
import { MutationFunction } from "@tanstack/react-query";
import { customAxios } from "./customAxios";

type ChangePasswordParams = {
  payload: ChangePasswordData
};

type ChangePasswordResponse = {
  success?: boolean;
};

export const patchChangePassword: MutationFunction<ChangePasswordResponse, ChangePasswordParams> = async ({ payload }) => {
  const response = await customAxios.patch<ChangePasswordResponse>("/users/password", payload);
  return response.data;
}