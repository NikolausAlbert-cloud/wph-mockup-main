import { GetUserPostsParams_dataProps } from '@/api/posts'
import { Post_empty } from '@/components/Posts/Post_empty';
import { PostImageHandler } from '@/components/Posts/PostImageHandler';
import { RootState } from '@/redux/store';
import { formatDate } from '@/utils/formatDate';
import { Item } from '@radix-ui/react-dropdown-menu';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';

export const PostDetail = () => {
  const { data, fetchPostDetail_status, error }: {
    data: GetUserPostsParams_dataProps[], fetchPostDetail_status: "idle" | "loading" | "succeeded" | "failed", error: string | null
  } = useSelector((state: RootState) => state.postDetail);

  console.log("PostDetail data: ", data)

  if (fetchPostDetail_status === "loading") {
    return (
      <p>Loading public posts...</p>
    )
  } else if (fetchPostDetail_status === "failed") {
    return (
      <p>Error loading posts: {error?.message || 'Unknown error'}</p>
    )
  } else if (!data || data.length === 0) {
    return (
      <Post_empty 
        p1="No post found" 
        p2="Try clicking valid Post" 
        buttonTitle="Back to Home" 
        buttonLink="/" 
      />
    )
  }

  {data.map((item: GetUserPostsParams_dataProps, i) => {
    const createDate = formatDate(item.createdAt);
    
    const mainPostImage = (
      <PostImageHandler
        component="postblog"
        imageUrl={item.imageUrl}
        altText="Post Image"
        className="w-full max-w-85 h-full flex-none py-2"
      />
    );

    return (
      <div
        key={item.id} 
        className={` w-full flex py-4 md:py-5 border-neutral-300`}
      >
        <div className={`w-full flex justify-between gap-4 md:gap-6 h-55 md:h-64.5`}>
          <div 
            className={`w-full py-2 flex flex-col gap-2 justify-between`}
          >
            <h1 className="max-h:15 md:max-h-17 truncate text-md md:text-xl font-semibold flex md:font-bold text-neutral-900">
              { item.title }
            </h1>
            <div className="flex flex-row gap-2">
              {item.tags.map((tag: string) => {
                return (
                  <p 
                    key={`${item.id}-${tag}`} 
                    className="text-xs font-regular text-neutral-900 h-7 border-1 border-neutral-300 rounded-md px-2"
                  >
                    { tag }
                  </p>
                )
              })}
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex-between gap-2">
                <div className="size-10 rounded-full bg-primary-200 text-sm overflow-hidden text-ellipsis flex-center">
                  {item.author.name}
                </div>
                <p className="text-sm font-medium">{ item.author.name }</p>
              </div>
              <div className="size-1 bg-neutral-400 rounded-full"></div>
              <div className="text-sm font-regular text-neutral-600">
                {createDate.date}
              </div>
            </div>
            <div className="flex flex-row gap-5 text-sm font-regular max-w-26.5">
              <div className="flex-between gap-1 max-w-11">
                <ThumbsUp className="size-5 text-neutral-600" />
                <p>{ item.likes }</p>
              </div>
              <div className="flex-between gap-1 max-w-11">
                <MessageSquare className="size-5 text-neutral-600" />
                <p>{ item.comments }</p>
              </div>
            </div>
            <div>{mainPostImage}</div>
            <div>
              {item.content}
            </div>
          </div>
        </div>
      </div>
    )
  })}
};
