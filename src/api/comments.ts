import { customAxios } from "./customAxios";

type CommentProps = {
  id: number,
  content: string,
  author: {
    id?: number,
    name: string,
    email?: string
  },
  post: number,
  createdAt: string
};

type NewCommentProps = {
  payload: {
    comment: string,
    postId: number
  }
};

const postComment = async ({ payload }: NewCommentProps): Promise<CommentProps> => {
  try {
    const response = await customAxios.post(
      `/comments/${payload.postId}`, { content:payload.comment }
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  };
};

const getComment = async (postId: number): Promise<CommentProps[]> => {
  try {
    const response = await customAxios.get(`/comments/${postId}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export type { CommentProps, NewCommentProps };
export { postComment, getComment };