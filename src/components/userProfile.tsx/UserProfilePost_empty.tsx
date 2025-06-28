import NoResult from "@/assets/images/no-result.svg";
import { Button } from '../ui/button';
import { PencilLine } from 'lucide-react';
import { Link } from "react-router-dom";

export const UserProfilePost_empty = () => {
  return (
    <div className="flex-center flex-col gap-6 py-16.5 md:py-32.5">
      <NoResult className="w-29.5 h-34"/>
      <div className="text-sm flex-center flex-col text-neutral-950">
        <p className=" font-semibold ">Your writing journey starts here</p>
        <p className="font-regular text-center w-63 md:w-full">
          No posts yet, but every great writer starts with the first one.
        </p>
      </div>
      <Button className="w-60 md:w-50 h-11">
        <PencilLine className="size-5"/>
        <Link to="/posts" className="text-sm font-semibold text-neutral-25 pl-2">Write Post</Link>
      </Button>
    </div>
  )
}
