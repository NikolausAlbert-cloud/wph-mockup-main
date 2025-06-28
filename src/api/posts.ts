import { UserStorage } from "@/utils/validation";
import { customAxios } from "./customAxios";

type PostsParams = {
  payload: {
    title: string;
    content: string;
    coverimage: string;
    tags: string[];
  }
};

type PostsResponse = {
  id: number;
  title: string;
  content: string;
  tags: string[],
  imageUrl: string;
  author: UserStorage;
  createdAt: string;
  likes: number;
  comments: number;
};

export const postPosts = async ({ payload }: PostsParams): Promise<PostsResponse> => {
  const response = await customAxios.post<PostsResponse>("/posts", payload);
  return response.data;
}