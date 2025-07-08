import { UserPost_short } from '@/components/UserPost_short';
import { useInfinitePublicPost } from '@/hooks/useInfinitePublicPost';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useWindowDimensions from '@/hooks/useWindowsDImensions';

export const PublicPost = () => {
  const { width } = useWindowDimensions();
  const { 
    data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage 
  } = useInfinitePublicPost();
  
  if (data && data.pages && data.pages.length > 0) { 
    // console.log("PublicPost first page data: ", data.pages[0].data); 
  }

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      // console.log("Intersection observer triggered, fetching next page.")
      fetchNextPage();
    };
  });

  if (isLoading) { 
    return <p className="mt-40">Loading public posts...</p>; 
  }

  if (isError) { 
    return <p className="mt-40">Error loading posts: {error?.message || 'Unknown error'}</p>;
  }

 if (!data || !data.pages || data.pages.length === 0) { 
    return <p className="mt-40">No public posts found (or data structure issue).</p>;
  }

  return (
    <div className={`mt-32 max-sm:px-4 flex justify-center ${width > 640 && "custom-container flex-row"}`}>
      <div className="clamped-container4 md:border-r-1 md:border-neutral-300 md:pr-12 flex flex-col">
        <h1 className="text-xl font-bold text-neutral-900">Recommended for you</h1>
        <UserPost_short data={data} source="publicPost"/>
        <div ref={observerRef} >
          {isFetchingNextPage && <p>Loading more posts...</p>}
          {!hasNextPage && !isFetchingNextPage && <p>You've reached the end!</p>}
        </div>
      </div>
      {width > 640 && (
        <div className="pl-12 max-w-74">
          <h1 className="text-xl font-bold text-neutral-900">Most Like</h1>
        </div>
      )}
    </div>
  )
}
