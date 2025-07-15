import { UserPost_short } from '@/components/UserPost_short';
import { useInfinitePublicPost } from '@/hooks/useInfinitePublicPost';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export const PublicPost = () => {
  const { width } = useWindowDimensions();
  const breakpoint = 1173;
  const { 
    data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage 
  } = useInfinitePublicPost();

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      // console.log("Intersection observer triggered, fetching next page.")
      fetchNextPage();
    };
  });

  return (
    <div 
      className={`w-full max-w-300 px-4 md:mx-auto mt-22 md:mt-32 flex flex-col-reverse ${width > breakpoint && "flex-row"}`}
    >
      {isLoading ? (
        <p>Loading public posts...</p>
      ) : isError ? (
        <p>Error loading posts: {error?.message || 'Unknown error'}</p>
      ) : (!data || !data.pages || data.pages.length === 0) ? (
          <p>No public posts found (or data structure issue).</p>
      ) : (
        <>
          <div 
            className={`${width > breakpoint && "max-w-213.5 border-r-1 border-neutral-300 pr-12"} flex flex-col w-full`}
          >
            <h1 className="text-xl font-bold text-neutral-900">Recommended for you</h1>
            <UserPost_short data={data} source="publicPost" breakpoint={breakpoint}/>
            <div ref={observerRef} >
              {isFetchingNextPage && <p>Loading more posts...</p>}
              {!hasNextPage && !isFetchingNextPage && <p>You've reached the end!</p>}
            </div>
          </div>
          <div className={`flex flex-col ${width > breakpoint && "pl-12"} w-full md:max-w-86`}>
            <div className="w-full bg-red-50">
              <h1 className="text-xl font-bold text-neutral-900">Most Like</h1>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
