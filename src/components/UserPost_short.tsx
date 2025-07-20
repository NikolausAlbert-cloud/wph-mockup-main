import { GetPublicPostResponse_dataProps } from "@/api/posts";
import { GetUserPostsParams_dataProps } from "@/api/posts";
import { userPostsButton_data } from "@/constants/userPostsButton_data";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { formatDate } from "@/utils/formatDate";
import { MessageSquare, ThumbsUp } from "lucide-react";
import React from "react";
import { PostImageHandler } from "./Posts/PostImageHandler";
import { Link } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchPostDetail } from "@/redux/slices/getPostDetailSlice";

interface BaseUserPostShortProps {
  status?: string;
  error?: string | null;
  breakpoint?: number;
}

type UserPostShort_PublicPost = BaseUserPostShortProps & {
  source: "publicPost";
  data: { pages: { data: GetPublicPostResponse_dataProps[] }[] }; 
};

type UserPostShort_UserPost = BaseUserPostShortProps & {
  source: "userPost" | "searchPost";
  data: { data: GetUserPostsParams_dataProps[] };
};

type UserPost_shortProps = UserPostShort_PublicPost | UserPostShort_UserPost;
type ItemProps = GetPublicPostResponse_dataProps | GetUserPostsParams_dataProps;

export const UserPost_short = ({ 
  status, data, error, source, breakpoint 
}: UserPost_shortProps) => {
  const { width } = useWindowDimensions();
  let dataSource = [];
  const dispatch:AppDispatch = useDispatch();

  let containerClassName = "";
  switch (source) {
    case "userPost":
      dataSource = data.data;
      containerClassName = "h-63 md:h-74.5";
      break;
    case "publicPost":
      dataSource = data.pages[0].data;
      containerClassName = "h-66.5 md:h-74.5";
      break;
    case "searchPost":
      dataSource = data;
      containerClassName = "h-66.5 md:h-74.5";
      break;
    default:
      return;
  }

  if (status === "loading") {
    return <p>Loading....</p>
  }

  if (status === "failed") {
    return <p>Error: {error?.message || "Error in fetching user posts data"}</p>
  }

  return (
    <>
      {dataSource.map((item: ItemProps, i) => {
        const createDate = formatDate(item.createdAt);
      // const updateDate = formatDate(item.updateAt);

        const mainPostImage = (
          <PostImageHandler
            component="postblog"
            imageUrl={item.imageUrl}
            altText="Post Image"
            className="w-full max-w-85 h-full flex-none py-2"
          />
        );

        const postBlogTypePublic = ["publicPost", "searchPost"];

        return (
          <Link
            to={`/posts/detail/${item.id}`} 
            onClick={() => dispatch(fetchPostDetail(item.id))}
            key={item.id} 
            className={`${containerClassName} w-full flex py-4 md:py-5 border-neutral-300 ${postBlogTypePublic.includes(source) && i === 0 ? "" : "border-t-[1px]"}`}
          >
            <div className={`w-full flex justify-between gap-4 md:gap-6 h-55 md:h-64.5`}>
              {width > 640 && mainPostImage}
              <div 
                className={`w-full ${source === "publicPost" && width < breakpoint ? "" : "max-w-109"} py-2 flex flex-col gap-2 justify-between overflow-hidden`}
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
                <div className="text-xs md:text-sm font-regular h-12 md:h-14 text-neutral-900 overflow-hidden text-ellipsis">
                  { item.content }
                </div>
                { source === "userPost" ? (
                <React.Fragment>
                  <div 
                    className="flex flex-row gap-1 md:gap-3 text-xs h-6 font-regular text-neutral-700 overflow-hidden text-ellipsis"
                  >
                    <p className="pr-1 md:pr-3 border-r-1 border-neutral-300">
                      Created { createDate.date }, { createDate.time }
                    </p>
                    <p>Last updated { createDate.date }, { createDate.time }</p>
                  </div>
                  <div className="flex flex-row gap-3">
                  {userPostsButton_data.map((btnItem, j) => {
                    const isLastItem = j === userPostsButton_data.length - 1;
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
                ) :  postBlogTypePublic.includes(source) && (
                <React.Fragment>
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
                </React.Fragment>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}
