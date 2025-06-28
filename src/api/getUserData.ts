import { GetUserDataType } from "@/utils/validation";
import { MutationFunction } from "@tanstack/react-query";
import { customAxios } from "./customAxios";

type GetUserDataParams = {
  email: string | null;
}

export const getUserData: MutationFunction<GetUserDataType, GetUserDataParams> = async ({email}) => {
  const response = await customAxios.get<GetUserDataType>(`users/by-email/${email}`);
  
  return response.data;
}
