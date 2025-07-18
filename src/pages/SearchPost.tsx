import { GetUserPostsParams_dataProps } from "@/api/posts";
import { SearchBar } from "@/components/navbar/SearchBar";
import { Post_empty } from "@/components/Posts/Post_empty";
import { UserPost_short } from "@/components/UserPost_short";
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const SearchPost = () => {
  const { data, userInput }: {
    data: GetUserPostsParams_dataProps[], userInput: string
  } = useSelector((state: RootState) => state.search);  
  
  return (
    <div className="max-md:mx-4 mt-20 md:mt-32 md:ml-30 md:max-w-202">
      <SearchBar className="max-w-94 md:hidden pb-4" />
      { data.length === 0 ? (
        <Post_empty />
      ) : (
        <>
          <h1 className="text-2xl font-bold">{`Result for "${ userInput }"`}</h1>
          <UserPost_short data={data} source="searchPost"/>
        </>
      )}
    </div>
  )
}
