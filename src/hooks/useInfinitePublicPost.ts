import { getPublicPost } from "@/api/getPublicPost"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useInfinitePublicPost = () => {
  return useInfiniteQuery({
    queryKey: ["publicPost"],

    queryFn: ({ pageParam = 1}: { pageParam: number }) => {
      const limit = 10;
      return getPublicPost(pageParam, limit);
    },

    getNextPageParam: (lastPage: any) => (lastPage.nextPage ? lastPage.nextPage : undefined),

    initialPageParam: 1,
  });
};