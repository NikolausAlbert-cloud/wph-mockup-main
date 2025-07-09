import { customAxios } from "./customAxios";

export type PublicPostResponse_dataProps = {
  id: number,
  title: string,
  content: string,
  tags: string [],
  imageUrl: string,
  author: {
    id: number,
    name: string,
    email: string,
  },
  createdAt: string,
  likes: number,
  comments: number
};

type GetPublicPostResponse = {
  data: PublicPostResponse_dataProps[],
  total: number,
  page: number,
  lastPage: number
};

export const getPublicPost = async (page: number, limit: number): Promise<GetPublicPostResponse> => {
  const response = await customAxios.get(`/posts/recommended?page=${page}&limit=${limit}`);
  return response.data;
}