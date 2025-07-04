import { UserBoxInfo } from "@/components/UserBoxInfo"
import { UserPost_short } from "@/components/UserPost_short"
import useWindowDimensions from "@/hooks/useWindowsDImensions"
import { fetchUserData } from "@/redux/slices/getUserDataSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { DialogFormDataType } from "@/utils/validation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const UserPostBlog = () => {
  const { width } = useWindowDimensions();
  const dispatch: AppDispatch = useDispatch()
  const { fetchUserData_status: status, data, error } = useSelector((state: RootState) => state.user);
  const { fetchUserPosts_status, data: post_data, error: post_error } = useSelector((state: RootState) => state.post);
  console.log("userPostBlog: ", status, error, data)
  const [ userData, setUserData ] = useState<DialogFormDataType>({
    name: "",
    headline: "",
    avatar: null,
  })

  useEffect(() => {
    setUserData({
      name: data.name,
      headline: data.headline,
      avatar: data.avatarUrl || null
    })
  }, [data])

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserData())
    }
  }, [dispatch, status])

  let content;
  if (status === "loading") {
    content = <p>Loading user info...</p>; 
  } else if (status === "succeeded") {
    content = <UserBoxInfo dialogFormData={userData} />;
  } else if (status === "failed") {
    content = <p className="text-red-500">Error: {error || "Failed to load user data"}</p>; 
  } else {
    content = null; 
  }

  return (
    <div className="mt-22 md:mt-32 w-full">
      <div className="clamped-container flex-start border-b-neutral-300 border-b-[1px] md:h-26 md:pb-6">
        {content}
      </div>
      <div className="clamped-container flex flex-col">
        <p className="text-xl font-bold pt-6">
          {post_data.total > 0 ? post_data.total === 1 ? "1 Post" : `${post_data.total} Posts` : "No Posts"}
        </p>
        <div 
          className={`flex flex-col`}
        >
          <UserPost_short width={width} status={fetchUserPosts_status} data={post_data} error={post_error}/>
        </div>
      </div>
    </div>
  )
};