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
    <div className="mt-22 md:mt-32">
      <div className="flex-start border-b border-neutral-300 border-[1px] md:h-26 md:pb-6">
        {content}
      </div>
      <div className="flex flex-col">
        <p>Posts</p>
        <div 
          className={`flex ${width > 640 ? "flex-row" : "flex-col"} md:py-5 md:h-64.5 border-b border-neutral-300 border-[1px]`}
        >
          <UserPost_short width={width} />
        </div>
      </div>
    </div>
  )
};