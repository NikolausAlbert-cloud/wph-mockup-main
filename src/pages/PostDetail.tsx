import { GetUserPostsParams_dataProps } from '@/api/posts'
import { AnotherPost } from '@/components/Posts/AnotherPost';
import { Comments } from '@/components/Posts/Comments';
import { CommentsBlog } from '@/components/Posts/CommentsBlog';
import { Post_empty } from '@/components/Posts/Post_empty';
import { PostImageHandler } from '@/components/Posts/PostImageHandler';
import { RootState } from '@/redux/store';
import { formatDate } from '@/utils/formatDate';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';

export const PostDetail = () => {
  const { data, fetchPostDetail_status, error }: {
    data:GetUserPostsParams_dataProps, fetchPostDetail_status: "idle" | "loading" | "succeeded" | "failed", error: string | null
  } = useSelector((state: RootState) => state.postDetail);

  if (fetchPostDetail_status === "loading") {
    return (
      <p>Loading public posts...</p>
    )
  } else if (fetchPostDetail_status === "failed") {
    return (
      <p>Error loading posts: {error?.message || 'Unknown error'}</p>
    )
  } else if (!data) {
    return (
      <Post_empty 
        p1="No post found" 
        p2="Try clicking valid Post" 
        buttonTitle="Back to Home" 
        buttonLink="/" 
      />
    )
  }

    const createDate = formatDate(data.createdAt);
    
    const mainPostImage = (
      <PostImageHandler
        component="postblog"
        imageUrl={data.imageUrl}
        altText="Post Image"
        className="w-full h-full max-h-152 rounded-sm"
      />
    );

  return (
    <div 
      key={data.id}
      className={`mx-auto w-full max-w-200 flex flex-col gap-4 mt-32`}
    >
      <h1 
        className="text-md md:text-xl font-semibold  md:font-bold text-neutral-900"
      >
        { data.title }
      </h1>
      <div className="flex flex-row gap-2">
        {data.tags.map((tag: string) => {
          return (
            <p 
              key={`${data.id}-${tag}`} 
              className="text-xs font-regular text-neutral-900 h-7 border-1 border-neutral-300 rounded-md px-2"
            >
              { tag }
            </p>
          )
        })}
      </div>
      <div className="pb-4 border-b-1 border-b-neutral-300 flex flex-row items-center gap-3">
        <div className="flex-between gap-2">
          <div className="size-10 rounded-full bg-primary-200 text-sm overflow-hidden text-ellipsis flex-center">
            {data.author.name}
          </div>
          <p className="text-sm font-medium">{ data.author.name }</p>
        </div>
        <div className="size-1 bg-neutral-400 rounded-full"></div>
        <div className="text-sm font-regular text-neutral-600">
          {createDate.date}
        </div>
      </div>
      <div 
        className="pb-4 border-b-1 border-b-neutral-300 flex flex-row gap-5 text-sm font-regular"
      >
        <div className="flex-between gap-1 max-w-11">
          <ThumbsUp className="size-5 text-neutral-600" />
          <p>{ data.likes }</p>
        </div>
        <div className="flex-between gap-1 max-w-11">
          <MessageSquare className="size-5 text-neutral-600" />
          <p>{ data.comments }</p>
        </div>
      </div>
      <>
        {mainPostImage}
      </>
      <div className="pb-4 border-b-neutral-300">
        {data.content}
      </div>
      <Comments postId={data.id} />
      <CommentsBlog postId={data.id} />
      <AnotherPost userId={data.author.id} postId={data.id} />
    </div>
  )
};
