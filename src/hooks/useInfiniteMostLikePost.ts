import { getMostLikePosts } from "@/api/posts";
import { useInfiniteQuery } from "@tanstack/react-query"

export const useInfiniteMostLikePost = () => {
  return useInfiniteQuery({
    queryKey: ["mostLikePosts"],

    queryFn: ({ pageParam = 1}: { pageParam: number }) => {
      const limit = 10;
      return getMostLikePosts(pageParam, limit);
    },

    getNextPageParam: (lastPage: any) => (lastPage.nextPage ? lastPage.nextPage : undefined),

    initialPageParam: 1,
  })
};