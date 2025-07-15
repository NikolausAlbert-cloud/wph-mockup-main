import { GetMostLikePostsResponse_dataProps } from '@/api/posts'
import { MessageSquare, ThumbsUp } from 'lucide-react';
import React from 'react'

type MostLikePostProps = {
  data: GetMostLikePostsResponse_dataProps[];
};

export const MostLikePost = ({ data }: MostLikePostProps) => {

  {data.map((item, i) => {
    return (
      <div 
        key={item.id} 
        className={`flex flex-col justify-between h-51 w-full py-5 ${i === 0 ? "" : "border-t-neutral-300"} border-[1px]`}
      >
        <div className="max-h-30">
          <h2 className="text-md font-bold">
            {item.title}
          </h2>
          <p className="overflow-hidden text-ellipsis text-sm font-regular">
            {item.content}
          </p>  
        </div>
        <div className="flex-between flex-row gap-5 text-neutral-600 text-sm font-regular">
          <div className="flex-between gap-1.5 max-w-11">
            <ThumbsUp className="size-5 text-neutral-600" />
            <p>{ item.likes }</p>
          </div>
          <div className="flex-between gap-1.5 max-w-11">
            <MessageSquare className="size-5 text-neutral-600" />
            <p>{ item.comments }</p>
          </div>
        </div>
      </div>
    )
  })}

}
