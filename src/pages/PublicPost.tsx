import { MostLikePost } from '@/components/MostLikePost';
import { UserPost_short } from '@/components/UserPost_short';
import { useInfiniteMostLikePost } from '@/hooks/useInfiniteMostLikePost';
import { useInfinitePublicPost } from '@/hooks/useInfinitePublicPost';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export const PublicPost = () => {
  const { width } = useWindowDimensions();
  const breakpoint1 = 1173;
  const breakpoint2 = 692;
  const { 
    data:dataPublicPost, isLoading:publicPostIsLoading, isError:publicPostIsError, error:publicPostError, hasNextPage:publicPostHasNextPage, isFetchingNextPage:publicPostIsFetchingNextPage, fetchNextPage:publicPostFetchNextPage 
  } = useInfinitePublicPost();
  const {
    data:dataMostLikePost, isLoading:mostLikePostIsLoading, isError:mostLikePostIsError, error:mostLikePostError, hasNextPage:mostLikePostHasNextPage, isFetchingNextPage:mostLikePostIsFetchNextPage, fetchNextPage:mostLikePostFetchNextPage
  } = useInfiniteMostLikePost();

  const observerRef = useIntersectionObserver(() => {
    if (publicPostHasNextPage && !publicPostIsFetchingNextPage) {
      // console.log("Intersection observer triggered, fetching next page.")
      publicPostFetchNextPage();
    };
  });

  return (
    <div 
      className={`w-full max-w-300 px-4 md:mx-auto mt-22 md:mt-32 flex flex-col-reverse ${width > breakpoint1 && "flex-row"}`}
    >
      {publicPostIsLoading ? (
        <p>Loading public posts...</p>
      ) : publicPostIsError ? (
        <p>Error loading posts: {publicPostError?.message || 'Unknown error'}</p>
      ) : (!dataPublicPost || !dataPublicPost.pages || dataPublicPost.pages.length === 0) ? (
          <p>No public posts found (or data structure issue).</p>
      ) : (
        <>
          <div 
            className={`${width > breakpoint1 && "max-w-213.5 border-r-1 border-neutral-300 pr-12"} flex flex-col w-full`}
          >
            <h1 className="text-xl font-bold text-neutral-900">Recommended for you</h1>
            <UserPost_short data={dataPublicPost} source="publicPost" breakpoint={breakpoint1}/>
            <div ref={observerRef} >
              {publicPostIsFetchingNextPage && <p>Loading more posts...</p>}
              {!publicPostHasNextPage && !publicPostIsFetchingNextPage && <p>You've reached the end!</p>}
            </div>
          </div>
          <div className={`${width > breakpoint1 ? "pl-12 max-w-86" : "w-full"} `}>
            <h1 className="text-xl font-bold text-neutral-900">Most Like</h1>
            {mostLikePostIsLoading ? (
              <p>Loading most liked posts...</p>
            ) : mostLikePostIsError ? (
              <p>Error loading most liked posts: {mostLikePostError?.message || 'Unknown error'}</p>
            ) : (!dataMostLikePost || !dataMostLikePost.pages || dataMostLikePost.pages.length === 0) ? (
                <p>No most liked posts found (or data structure issue).</p>
            ) : (
              <div className={`flex w-full ${width > breakpoint1 || width < breakpoint2 ? "flex-col" : "flex-row"}`}>
                <MostLikePost data={dataMostLikePost} breakpoint1={breakpoint1} breakpoint2={breakpoint2} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
