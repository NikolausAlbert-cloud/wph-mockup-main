import { getUserPostsResponse } from "@/api/posts";
import { userPostsButton_data } from "@/constants/userPostsButton_data";
import { fetchUserPosts } from "@/redux/slices/getUserPostsSlice";
import { AppDispatch } from "@/redux/store";
import { extractPlainTextFromHtml } from "@/utils/extractPlainTextFromHtml";
import { limitText } from "@/utils/limitText";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type UserPost_shortProps = {
  width: number;
  status: string;
  data: getUserPostsResponse;
  error: string | null;
};

export const UserPost_short = ({width, status, data, error}: UserPost_shortProps) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserPosts({ payload:{ limit: 10, page: 1 } }));
    }
  }, [status])

  if (status === "loading") {
    return <p>Loading....</p>
  }

  if (status === "failed") {
    return <p>Error in fetching user posts data</p>
  }
  
  return (
    <>
      <p>{ error }</p>
      {data.data.map((item) => {
        const plainText = extractPlainTextFromHtml(item.content);
        const shortContent = limitText(plainText);
        const image = <img src={item.imageUrl} alt="Post Image" className="w-85 max-h-64.5 object-cover" />

        return (
          <div key={item.id} className="flex-between gap-6 py-6 border-b-neutral-300 border-b-[1px]">
            {width > 640 && image}
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-bold text-neutral-900">{ item.title }</h1>
              <div className="flex flex-row gap-2">
                {item.tags.map((tag, i) => {
                  return (
                    <p key={i} className="text-xs font-regular text-neutral-900 md:h-7 border-1 border-neutral-300 rounded-md px-2">
                      { tag }
                    </p>
                  )
                })}
              </div>
              <div className="text-sm font-regular text-neutral-900">{ shortContent }</div>
              <div className="flex flex-row gap-3 text-xs font-regular text-neutral-700">
                <p>Created at { item.createdAt }</p>
                <p className="bg-neutral-300 w-[1px] h-4"/>
                <p>Last updated { item.createdAt }</p>
              </div>
              <div className="flex flex-row gap-3">
              {userPostsButton_data.map((item) => {
                return (
                  <button key={item.title} 
                  className={`${item.title === "Delete" ? "text-red-delete" : "text-primary-300"} text-sm font-semibold underline underline-offset-4 cursor-pointer`}
                  >
                    {item.title}
                  </button>
                )
              })}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
