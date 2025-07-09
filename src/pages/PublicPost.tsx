import { UserPost_short } from '@/components/UserPost_short';
import { useInfinitePublicPost } from '@/hooks/useInfinitePublicPost';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export const PublicPost = () => {
  const { width } = useWindowDimensions();
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
      className={`mt-32 max-sm:px-4 flex flex-col-reverse lg:flex-row ${width > 768 && "custom-container"} w-full`}
    >
      {isLoading ? (
        <p>Loading public posts...</p>
      ) : isError ? (
        <p>Error loading posts: {error?.message || 'Unknown error'}</p>
      ) : (!data || !data.pages || data.pages.length === 0) ? (
          <p>No public posts found (or data structure issue).</p>
      ) : (
        <>
          <div className="clamped-container4 lg:border-r-1 lg:border-neutral-300 lg:pr-12 flex flex-col max-lg:w-full ">
            <h1 className="text-xl font-bold text-neutral-900">Recommended for you</h1>
            <UserPost_short data={data} source="publicPost"/>
            <div ref={observerRef} >
              {isFetchingNextPage && <p>Loading more posts...</p>}
              {!hasNextPage && !isFetchingNextPage && <p>You've reached the end!</p>}
            </div>
          </div>
          <div className="flex flex-col max-lg:clamped-container4 lg:pl-12 w-full lg:max-w-74">
            <h1 className="text-xl font-bold text-neutral-900">Most Like</h1>
          </div>
        </>
      )}
    </div>
  )
}
