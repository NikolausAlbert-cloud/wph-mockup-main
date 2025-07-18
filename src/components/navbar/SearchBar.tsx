import { saveSearchPost, searchPostThunk } from "@/redux/slices/searchPostSlice"
import { AppDispatch } from "@/redux/store";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

type SearchBarProps = {
  className: string;
}

export const SearchBar = ({ className }: SearchBarProps) => {
  const [ searchTerm, setSearchTerm ] = useState("");
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInputClick = () => {
    dispatch(saveSearchPost(searchTerm));
    dispatch(searchPostThunk(searchTerm));
    navigate("/search");
  };

  const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(saveSearchPost(searchTerm));
      dispatch(searchPostThunk(searchTerm))
      navigate("/search");
    }
  };

  return (
    <>
      <div className={`relative w-full md:flex md:flex-between ${className}`}>
        <input 
          name="search"
          type="search" 
          placeholder="Search" 
          className="h-12 w-full border border-neutral-300 rounded-xl pl-12 text-sm font-regular text-neutral-500"  
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <Link to="/search" onClick={handleInputClick}>
          <Search className="absolute top-0 translate-y-3 left-0 translate-x-4 size-6 cursor-pointer text-neutral-500" />
        </Link>
      </div>
    </>
  )
}