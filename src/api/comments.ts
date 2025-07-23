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
    console.log("Posting comment:", payload);
    const response = await customAxios.post(`/comments/${payload.postId}`, payload.comment);
    console.log("Comment posted successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
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

export type { CommentProps, NewCommentProps };
export { postComment, getComment };