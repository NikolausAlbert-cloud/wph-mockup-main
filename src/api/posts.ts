import { customAxios } from "./customAxios";

type PostsParams = {
  payload: {
    title: string;
    content: string;
    coverImage: File;
    tags: string[];
  }
};

type PostsResponse = {
  id: number;
  title: string;
  content: string;
  tags: string[],
  imageUrl: string;
  author: {id: number};
  createdAt: string;
  likes: number;
  comments: number;
};

export const postPosts = async ({ payload }: PostsParams): Promise<PostsResponse> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  // Append tags as separate entries if your backend expects it that way for arrays
  payload.tags.forEach(tag => formData.append("tags[]", tag));

  // Append the actual image file with the correct field name for your backend
  formData.append("image", payload.coverImage);

  console.log("FormData for postPosts will be sent.");

  const response = await customAxios.post<PostsResponse>("/posts", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}