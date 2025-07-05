import { getUserPostsResponse } from "@/api/posts";
import { userPostsButton_data } from "@/constants/userPostsButton_data";
import useWindowDimensions from "@/hooks/useWindowsDImensions";
import { extractPlainTextFromHtml } from "@/utils/extractPlainTextFromHtml";
import { formatDate } from "@/utils/formatDate";
import { limitText } from "@/utils/limitText";

type UserPost_shortProps = {
  status: string;
  data: getUserPostsResponse;
  error: string | null;
};

export const UserPost_short = ({ status, data, error }: UserPost_shortProps) => {
  const { width } = useWindowDimensions();

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
        const image = <img src={item.imageUrl} alt="Post Image" className="flex-1 w-85 object-cover" />;
        const createDate = formatDate(item.createdAt);
        const updateDate = formatDate(item.updateAt);

        return (
          <div key={item.id} className="flex-between gap-6 py-6 border-b-neutral-300 border-b-[1px]">
            {width > 640 && image}
            <div className="flex-1 flex-col gap-3 w-109">
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
              <div className="text-sm font-regular text-neutral-900">
                { shortContent }
              </div>
              <div className="flex-between gap-3 text-xs font-regular text-neutral-700">
                <p className="pr-3 border-r-1 border-neutral-300">Created at { createDate }</p>
                <p>Last updated { createDate }</p>
              </div>
              <div className="flex flex-row gap-3">
              {userPostsButton_data.map((item, i) => {
                const isLastItem = i === userPostsButton_data.length - 1;

                return (
                  <button key={item.title} 
                  className={`${item.title === "Delete" ? "text-red-delete" : "text-primary-300"} text-sm font-semibold underline underline-offset-4 cursor-pointer ${!isLastItem ? "border-r-1 border-neutral-300 pr-3" : ""} h-5.5 flex-center`}
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
