import { getComment } from "@/api/comments";
import { useInfiniteQuery } from "@tanstack/react-query"

export const useInfiniteComment = (postId: number) => {
  return useInfiniteQuery({
    queryKey: ["comments", postId],

    queryFn: (postId) => {
      return getComment(postId);
    },

    getNextPageParam: (lastPage: any) => (lastPage.nextPage ? lastPage.nextPage : undefined),

    initialPageParam: 1,
  });
};