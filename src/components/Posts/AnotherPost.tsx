import { useDispatch, useSelector } from 'react-redux'
import { UserPost_short } from '../UserPost_short'
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { fetchForeignUserPosts } from '@/redux/slices/getForeignUserPostsSlice';
import { useSortedDataToTimes } from '@/hooks/useSortedDataToTimes';

export const AnotherPost = ({ userId, postId }: { userId: number, postId: number }) => {
  const dispatch:AppDispatch = useDispatch();

  const { fetchForeignUserPosts_status, data, error }: {
    fetchForeignUserPosts_status: "idle" | "loading" | "succeeded" | "failed",
    data: { data: any },
    error: string | null
  } = useSelector((state: RootState) => state.foreignUserPost);
  
  useEffect(() => {
    if (fetchForeignUserPosts_status === "idle") {
      dispatch(fetchForeignUserPosts({ 
        payload: {
          userId: userId,
          page: 1,
          limit: 10
        }
      }));
    }
  }, [dispatch, fetchForeignUserPosts_status, userId]);

  const anotherPosts = data.data.filter((post: any) => post.id != postId);
  const sortedForeignPosts = useSortedDataToTimes(anotherPosts);

  return (
    <div className="py-4 border-t-[1px] border-neutral-300">
      <h1 className="text-xl font-bold pb-4">Another Post</h1>
      { fetchForeignUserPosts_status === "loading" ? (
        <p>Loading another posts...</p>
      ) : fetchForeignUserPosts_status === "failed" ? (
        <p>Error loading another posts: {error?.message || 'Unknown error'}</p>
      ) : !sortedForeignPosts || sortedForeignPosts.length === 0 ? (
        <p>No other posts found.</p>
      ) : (
        <UserPost_short
          source="anotherPost"
          data={sortedForeignPosts}
          status={fetchForeignUserPosts_status}
          error={error}
        />
      )}
    </div>
  )
}
