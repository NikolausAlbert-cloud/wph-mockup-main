import { CommentProps } from '@/api/comments';
import { UserDataProps } from '@/redux/slices/getUserDataSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { formatDate } from '@/utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { PostImageHandler } from './PostImageHandler';
import { useEffect, useState } from 'react';
import { fetchComment } from '@/redux/slices/commentSlice';
import { resetAddCommentStatus } from '../../redux/slices/commentSlice';
import { useSortedDataToTimes } from '@/hooks/useSortedDataToTimes';

export const CommentsBlog = ({ postId }: {postId: number}) => {
  const dispatch: AppDispatch = useDispatch();
  const [ showAllComments, setShowAllComments ] = useState(false);

  const { fetchComment_status, data: dataComment, fetchError:fetchCommentError, addComment_status, addCommentError }: {
    fetchComment_status: "idle" | "loading" | "succeeded" | "failed",
    data: CommentProps[],
    fetchError: string | null,
    addComment_status: "idle" | "loading" | "succeeded" | "failed",
    addCommentError: string | null
  } = useSelector((state: RootState) => state.comment);

  const { data: dataUser }: { data: UserDataProps} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (fetchComment_status === "idle" || addComment_status === "succeeded") {
      dispatch(fetchComment(postId));

      if (addComment_status === "succeeded") {
        dispatch(resetAddCommentStatus());  
      }
    }
  }, [fetchComment_status, addComment_status, postId, dispatch]);

  const userImage = (
    <PostImageHandler  
      name={dataUser?.name}
      component="commentsblog"
      imageUrl={dataUser?.avatarUrl}
      altText={dataUser?.name || "User Image"}
      className="size-12 rounded-full"
    />
  );

  const sortedComments = useSortedDataToTimes(dataComment);

  const commentToRender = showAllComments ? sortedComments : sortedComments.slice(0, 3);

  return (
    <div>
      {fetchComment_status === "loading" ? (
        <p className="py-2">Loading comments...</p>
      ) : fetchCommentError || addCommentError ? (
        <p className="py-2 text-red-500">
          Error loading comments: {fetchCommentError || addCommentError || 'Unknown error'}
        </p>
      ) : (!dataComment || dataComment.length === 0) ? (
        <p className="py-2">No comments found (or dataComment structure issue).</p>
      ) : (
        <div>
          { commentToRender.map((item: CommentProps) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 py-3 border-t-1 border-t-neutral-300"
            >
              <div className="flex flex-row items-center gap-2.5 max-h-13 ">
                {userImage}
              <div className="flex flex-col justify-start text-sm">
                <p className="font-semibold text-neutral-900">{item.author.name}</p>
                <p className="text-neutral-600">{formatDate(item.createdAt).date}</p>
              </div>
              </div>
              <div>
                <p className="text-sm text-neutral-900">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
          {dataComment.length > 3 && !showAllComments ? (
            <p
              className="text-primary-300 text-sm font-semibold cursor-pointer pt-1 pb-4 not-even:underline underline-offset-4"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              Show All Comments
            </p>
          ) : (
            <p
              className="text-primary-300 text-sm font-semibold cursor-pointer pt-1 pb-4 underline underline-offset-4"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              Show Less Comments
            </p>
          )}
        </div>
      )}
    </div>
  )
}
