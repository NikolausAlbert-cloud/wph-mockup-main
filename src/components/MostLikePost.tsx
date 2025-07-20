import { GetMostLikePostsResponse_dataProps } from '@/api/posts'
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { fetchPostDetail } from '@/redux/slices/getPostDetailSlice';
import { AppDispatch } from '@/redux/store';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

type MostLikePostProps = {
  data: any;
  breakpoint1: number;
  breakpoint2: number;
};

export const MostLikePost = ({ data, breakpoint1, breakpoint2 }:MostLikePostProps) => {
  const { width } = useWindowDimensions();
  const postToDisplay = data.pages[0].data.slice(0, 3);
  const dispatch:AppDispatch = useDispatch();

  return (
    <>
      {postToDisplay.map((item: GetMostLikePostsResponse_dataProps, i:number) => {
        return (
          <Link 
            to={`/posts/detail/${item.id}`} 
            onClick={() => dispatch(fetchPostDetail(item.id))}
            key={item.id} 
            className={`flex flex-col justify-between gap-4 max-h-51 w-full ${width > breakpoint1 || width < breakpoint2 ? "border-t-neutral-300 border-t-[1px] py-5" : "border-l-neutral-300 border-l-[1px] px-5 my-5"} ${i === 0 && "border-none"}`}
          >
            <div className="max-h-30">
              <h2 className="text-md font-bold max-h-15 overflow-hidden text-ellipsis">
                {item.title}
              </h2>
              <p className="overflow-hidden text-ellipsis max-h-14 text-sm font-regular">
                {item.content}
              </p>  
            </div>
            <div className="flex justify-between gap-5 text-neutral-600 text-sm font-regular max-w-26.5">
              <div className="flex-between gap-1.5 max-w-11">
                <ThumbsUp className="size-5 text-neutral-600" />
                <p>{ item.likes }</p>
              </div>
              <div className="flex-between gap-1.5 max-w-11">
                <MessageSquare className="size-5 text-neutral-600" />
                <p>{ item.comments }</p>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
};
