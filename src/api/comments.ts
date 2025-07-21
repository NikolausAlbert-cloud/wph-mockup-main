import { customAxios } from "./customAxios";

type CommentProps = {
  id: number,
  content: string,
  author: {
    id: number,
    name: string,
    email: string
  },
  post: number,
  createdAt: string
};

type NewCOmmentProps = {
  comment: string
};

const postComment = async (comment: NewCOmmentProps, postId: number): Promise<CommentProps> => {
  try {
    const response = await customAxios.post(`/comments/${postId}`, comment);
    return response.data;
  } catch (err) {
    console.err(err);
    return Promise.reject(err);
  };
};

const getComment = async (postId: number): Promise<CommentProps[]> => {
  try {
    const response = await customAxios.get(`/comments/${postId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export type { CommentProps };
export { postComment, getComment };