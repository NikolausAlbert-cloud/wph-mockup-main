import { CommentProps, NewCommentProps, postComment } from "@/api/comments";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Root } from "react-dom/client";
import { useSelector } from "react-redux";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const { data } = useSelector((state: RootState) => state.user);

  return useMutation({
    mutationFn: postComment,

    onMutate: async ({ payload }: NewCommentProps) => {
      await queryClient.cancelQueries({queryKey: ["comments", payload.postId]});
      const previousComments = queryClient.getQueryData<CommentProps[]>(["comments", payload.postId]);
      const optimisticComment: CommentProps & { avatarUrl: string | File} = {
        id: 9999,
        content: payload.comment,
        avatarUrl: data.avatarUrl || "",
        author: {
          name: data.name || "Anonymous",
        },
        createdAt: new Date().toISOString()
      };

      if (previousComments) {
        queryClient.setQueryData(["comments", payload.postId], (old: CommentProps[] | undefined) => {
          return old ? [optimisticComment, ...old] : [optimisticComment];
        });
      } else {
        queryClient.setQueryData(["comments", payload.postId], [optimisticComment]);
      };

      return { previousComments, optimisticComment };
    },

    onError: (error, payload, context) => {
      console.error("❌ Gagal menambah comment, rollback ke data lama!", error);
      if (context?.previousComments) {
        queryClient.setQueryData(["comments", payload.postId], context?.previousComments);
      } else {
        queryClient.setQueryData(["comments", payload.postId], []);
      }
    },

    onSettled: (_, _, payload) => {
      console.log("🔄 Refresh data dari server setelah comment berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["comments", payload.postId] });
    }
  })
}