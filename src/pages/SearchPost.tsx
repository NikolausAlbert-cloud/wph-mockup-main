import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

export const SearchPost = () => {
  const { data } = useSelector((state: RootState) => state.search);  
  console.log("searchPost: ", data);
  
  return (
    <div>SearchPost</div>
  )
}
