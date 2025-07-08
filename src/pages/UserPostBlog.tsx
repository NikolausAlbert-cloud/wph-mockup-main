import { UserBoxInfo } from "@/components/UserBoxInfo"
import { UserPost_short } from "@/components/UserPost_short"
import { fetchUserData } from "@/redux/slices/getUserDataSlice"
import { fetchUserPosts } from "@/redux/slices/getUserPostsSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { DialogFormDataType } from "@/utils/validation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const UserPostBlog = () => {
  const dispatch: AppDispatch = useDispatch()
  const { fetchUserData_status, data: user_data, error: user_error } = useSelector((state: RootState) => state.user);
  const { fetchUserPosts_status, data: post_data, error: post_error } = useSelector((state: RootState) => state.post);
  const [ userData, setUserData ] = useState<DialogFormDataType>({
    name: "",
    headline: "",
    avatar: null,
  })

  useEffect(() => {
    setUserData({
      name: user_data.name,
      headline: user_data.headline,
      avatar: user_data.avatarUrl || null
    })
  }, [user_data])

  useEffect(() => {
    if (fetchUserPosts_status === "idle") {
      dispatch(fetchUserPosts({ payload:{ limit: 10, page: 1 } }));
    }
  }, [fetchUserPosts_status])

  useEffect(() => {
    if (fetchUserData_status === "idle") {
      dispatch(fetchUserData())
    }
  }, [dispatch, fetchUserData_status])

  let content;
  if (fetchUserData_status === "loading") {
    content = <p>Loading user info...</p>; 
  } else if (fetchUserData_status === "succeeded") {
    content = <UserBoxInfo dialogFormData={userData} />;
  } else if (fetchUserData_status === "failed") {
    content = <p className="text-red-500">Error: {user_error || "Failed to load user data"}</p>; 
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
        <div className={`flex flex-col`}>
          <UserPost_short status={fetchUserPosts_status} data={post_data} error={post_error} source="userPost" />
        </div>
      </div>
    </div>
  )
};