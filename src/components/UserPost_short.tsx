import { PublicPostResponse_dataProps } from "@/api/getPublicPost";
import { getUserPostsParams_dataProps } from "@/api/posts";
import { userPostsButton_data } from "@/constants/userPostsButton_data";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { extractPlainTextFromHtml } from "@/utils/extractPlainTextFromHtml";
import { formatDate } from "@/utils/formatDate";
import { limitText } from "@/utils/limitText";
import { MessageSquare, ThumbsUp } from "lucide-react";
import React from "react";
import { PostImageHandler } from "./Posts/PostImageHandler";

interface BaseUserPostShortProps {
  status?: string;
  error?: string | null;
}

type UserPostShort_PublicPost = BaseUserPostShortProps & {
  source: "publicPost";
  data: { pages: { data: PublicPostResponse_dataProps[] }[] }; 
};

type UserPostShort_UserPost = BaseUserPostShortProps & {
  source: "userPost";
  data: { data: getUserPostsParams_dataProps[] };
};

type UserPost_shortProps = UserPostShort_PublicPost | UserPostShort_UserPost;
type ItemProps = PublicPostResponse_dataProps | getUserPostsParams_dataProps;

export const UserPost_short = ({ status, data, error, source }: UserPost_shortProps) => {
  const { width } = useWindowDimensions();
  let dataSource = []

  switch (source) {
    case "userPost":
      dataSource = data.data;
      break;
    case "publicPost":
      dataSource = data.pages[0].data;
      break;
    default:
      return;
  }

  if (status === "loading") {
    return <p>Loading....</p>
  }

  if (status === "failed") {
    return <p>Error in fetching user posts data</p>
  }

  return (
    <>
      {dataSource.map((item: ItemProps) => {
        const plainText = extractPlainTextFromHtml(item.content);
        const shortContent = limitText(plainText);
        const createDate = formatDate(item.createdAt);
      // const updateDate = formatDate(item.updateAt);

      const mainPostImage = (
        <PostImageHandler
            imageUrl={item.imageUrl}
            altText="Post Image"
            className="w-55 flex-initial object-cover"
        />
      );

        return (
          <div 
            key={item.id} 
            className="flex-between gap-4 md:gap-6 py-4 md:py-6 w-full lg:max-w-184 max-h-81 border-b-neutral-300 border-b-[1px]"
          >
            {width > 640 && mainPostImage}
            <div className="w-111 flex flex-col gap-2 md:gap-3">
              <h1 className="text-md md:text-xl font-semibold md:font-bold text-neutral-900">{ item.title }</h1>
              <div className="flex flex-row gap-2">
                {item.tags.map((tag: string) => {
                  return (
                    <p 
                      key={`${item.id}-${tag}`} 
                      className="text-xs font-regular text-neutral-900 md:h-7 border-1 border-neutral-300 rounded-md px-2"
                    >
                      { tag }
                    </p>
                  )
                })}
              </div>
              <div className="text-xs md:text-sm font-regular text-neutral-900">
                { shortContent }
              </div>
              { source === "userPost" ? (
               
                <React.Fragment>
                  <div className="flex flex-row gap-1 md:gap-3 text-xs font-regular text-neutral-700 whitespace-nowrap">
                    <p className="pr-1 md:pr-3 border-r-1 border-neutral-300">
                      Created { createDate.date }, { createDate.time }
                    </p>
                    <p>Last updated { createDate.date }, { createDate.time }</p>
                  </div>
                  <div className="flex flex-row gap-3">
                  {userPostsButton_data.map((btnItem, i) => {
                    const isLastItem = i === userPostsButton_data.length - 1;
                    return (
                      <button key={btnItem.title} 
                        className={`${btnItem.title === "Delete" ? "text-red-delete" : "text-primary-300"} text-sm font-semibold underline underline-offset-4 cursor-pointer ${!isLastItem ? "border-r-1 border-neutral-300 pr-3" : ""} h-5.5 flex-center`}
                      >
                        {btnItem.title}
                      </button>
                    )
                  })}
                  </div>
                </React.Fragment>
                
              ) :  source === "publicPost" && (
                <React.Fragment>
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex-between gap-2">
                      <img src={item.imageUrl} alt="user image" className="size-10 rounded-full" />
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
                </React.Fragment>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
