import { GetUserPostsParams_dataProps } from "@/api/posts";
import { UserPost_short } from "@/components/UserPost_short";
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const SearchPost = () => {
  const { data, userInput }: {
    data: GetUserPostsParams_dataProps[], userInput: string
  } = useSelector((state: RootState) => state.search);  
  
  return (
    <div className="max-sm:mx-4 md:mt-32 md:ml-30 w-full max-w-202">
      <h1 className="text-2xl font-bold">{`Result for "${ userInput }"`}</h1>
      <UserPost_short data={data} source="searchPost"/>
    </div>
  )
}
