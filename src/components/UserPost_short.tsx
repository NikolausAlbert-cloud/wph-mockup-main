import { getUserPostsResponse } from "@/api/posts";
import { fetchUserPosts } from "@/redux/slices/getUserPostsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type UserPost_shortProps = {
  width: number;
};

export const UserPost_short = ({width}: UserPost_shortProps) => {
  let image;
  const dispatch: AppDispatch = useDispatch();
  const { fetchUserPosts_status: status, data, error } = useSelector((state: RootState) => state.post);
  const [ postData, setPostData ] = useState<getUserPostsResponse>({
    data: [],
    total: 0,
    page: 0,
    lastPage: 0,
  });

  useEffect(() => {
    setPostData({
      data: data.data,
      total: data.total,
      page: data.page,
      lastPage: data.lastPage
    })  
  }, [data])

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
      {postData.data.map((item, i) => {
        image = <img src={item.imageUrl} alt="Post Image" className="w-20 h-20 rounded-full object-cover" />
        return (
          <div key={i}>
            {width < 640 && image}
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-bold text-neutral-900">{ item.title }</h1>
              <div className="flex flex-row gap-2">
                {item.tags.map((tag, j) => {
                  return (
                    <p key={j} className="text-xs font-regular text-neutral-900 md:h-7 border-neutral-300 rounded-md px-2">
                      { tag }
                    </p>
                  )
                })}
              </div>
              <p className="text-sm font-regular text-neutral-900">{ item.content }</p>
              <div className="flex flex-row gap-3 text-xs font-regular text-neutral-700">
                <p>Created at { item.createdAt }</p>
                <p className="bg-neutral-300 w-[1px] h-4"/>
                <p>Last updated { item.createdAt }</p>
              </div>
              <div className="flex flex-row gap-3">
                <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">
                  Statistic
                </button>
                <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">
                  Edit
                </button>
                <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
