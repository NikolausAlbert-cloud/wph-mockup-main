import { CommentProps, postComment } from "@/api/comments";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,

    onMutate: async (newComment: string, postId: number) => {
      await queryClient.cancelQueries({queryKey: ["comments"]});
      const previousComments = queryClient.getQueryData<CommentProps[]>(["comments"]);
      if (previousComments) {
        queryClient.setQueryData(["comments"], [newComment, ...previousComments]);
      }
      return { previousComments }
    },

    onError: (error, _, context) => {
       console.error("❌ Gagal menambah comment, rollback ke data lama!", error);
       queryClient.setQueryData(["comments"], context?.previousComments);
    },

    onSettled: () => {
      console.log("🔄 Refresh data dari server setelah comment berhasil ditambahkan");
      queryClient.invalidateQueries({queryKey: ["comments"]});
    }
  })
}