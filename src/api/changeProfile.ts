import { MutationFunction } from "@tanstack/react-query";
import { customAxios } from "./customAxios";

type changeProfileParamsProps = {
  name: string;
  headline: string;
  avatar?: string;
};

export type changeProfileParams = {
  payload: changeProfileParamsProps;
};

type changeProfileResponse = {
  id: number;
  name: string;
  email: string;
  headline: string;
  avatarUrl: null;
}

export const changeProfile: MutationFunction<changeProfileResponse,changeProfileParams> = async ({ payload }) => {
  const response = await customAxios.patch<changeProfileResponse>("/users/profile", payload);
  
  return response.data;
}