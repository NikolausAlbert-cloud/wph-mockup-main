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

type GetUserPostsParams = {
  payload: {
    limit: number;
    page: number;
  }
};

const postPosts = async ({ payload }: PostsParams): Promise<PostsResponse> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  // Append tags as separate entries if your backend expects it that way for arrays
  payload.tags.forEach(tag => formData.append("tags[]", tag));

  // Append the actual image file with the correct field name for your backend
  formData.append("image", payload.coverImage);

  const response = await customAxios.post<PostsResponse>("/posts", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

type GetUserPostsParams_dataProps =  {
  id: number;
  title: string,
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: number;
    name: string;
    email: string;
  }
};

type GetUserPostsResponse = {
  data: GetUserPostsParams_dataProps[];
  total: number;
  page: number;
  lastPage: number;
};

const getUserPosts = async ({ payload }: GetUserPostsParams): Promise<GetUserPostsResponse> => {
  const response = await customAxios.get(
    `/posts/my-posts?limit=${payload.limit}&page=${payload.page}`
  );
  return response.data;
};

type GetPublicPostResponse_dataProps = {
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
  data: GetPublicPostResponse_dataProps[],
  total: number,
  page: number,
  lastPage: number
};

const getPublicPost = async (page: number, limit: number): Promise<GetPublicPostResponse> => {
  const response = await customAxios.get(`/posts/recommended?page=${page}&limit=${limit}`);
  return response.data;
}

type GetMostLikePostsResponse_dataProps = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

type GetMostLikePostsResponse = {
  data: GetMostLikePostsResponse_dataProps[];
  total: number;
  page: number;
  lastPage: number;
};

const getMostLikePosts = async (page: number, limit: number): Promise<GetMostLikePostsResponse> => {
  const response = await customAxios.get(
    `posts/most-liked?limit=${limit}&page=${page}`
  );
  return response.data;
};

const searchPosts = async (query: string, page: number, limit: number): Promise<GetUserPostsResponse> => {
  const response = await customAxios.get(`posts/search?query=${query}&limit=${limit}&page=${page}`);
  return response.data;
};

const getPostDetail = async (id: number): Promise<GetUserPostsResponse> => {
  const response = await customAxios.get(`posts/${id}`);
  return response.data;
}

export type {
  GetUserPostsParams_dataProps,
  GetUserPostsParams,
  GetUserPostsResponse,
  GetPublicPostResponse_dataProps,
  GetPublicPostResponse,
  GetMostLikePostsResponse_dataProps,
  GetMostLikePostsResponse,
}

export {
  postPosts,
  getUserPosts,
  getPublicPost,
  getMostLikePosts,
  searchPosts,
  getPostDetail,
}