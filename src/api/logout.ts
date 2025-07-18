import { customAxios } from "./customAxios"

export const postLogout = async () => {
  const response = await customAxios.post("/auth/logout");
  return response.data;
}