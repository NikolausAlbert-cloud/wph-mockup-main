import { searchPosts } from "@/api/posts";
import { useInfiniteQuery } from "@tanstack/react-query"

export const infiniteSearchPost = (term: string) => {
  return useInfiniteQuery({
    queryKey: ["searchPost"],

    queryFn: ({ pageParam = 1 }: { pageParam: number }) => {
      const limit = 10;
      return searchPosts(term, pageParam, limit);
    },

    getNextPageParam: (lastPage: any) => (lastPage.nextPage ? lastPage.nextPage : undefined),

    initialPageParam: 1,
  });
};