import { useInfiniteComment } from '@/hooks/useInfiniteComment';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import React from 'react'

export const CommentsBlog = ({ postId }: {postId: number}) => {
  const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteComment(postId);

  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      // console.log("Intersection observer triggered, fetching next page.")
      fetchNextPage();
    };
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : isError ? (
        <p>Error loading comments: {error?.message || 'Unknown error'}</p>
      ) : (!data || !data.pages || data.pages.length === 0) ? (
        <p>No comments found (or data structure issue).</p>
      ) : (
        <div>
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p><strong>{comment.author.name}</strong> ({new Date(comment.createdAt).toLocaleDateString()}):</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
          <div ref={observerRef}>
            {isFetchingNextPage && <p>Loading more comments...</p>}
            {!hasNextPage && !isFetchingNextPage && <p>You've reached the end of comments!</p>}
          </div>
        </div>
      )}
    </div>
  )
}
