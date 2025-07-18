import NoResult from "@/assets/images/no-result.svg";
import { Button } from '../ui/button';
import { PencilLine } from 'lucide-react';
import { Link } from "react-router-dom";

type Post_emptyProps = {
  p1: string;
  p2: string;
  buttonTitle: string;
  buttonLink: string;
};

export const Post_empty = ({ p1, p2, buttonTitle, buttonLink }: Post_emptyProps) => {
  return (
    <div className="flex-center flex-col gap-6 py-16.5 md:py-32.5">
      <NoResult className="w-29.5 h-34"/>
      <div className="text-sm flex-center flex-col text-neutral-950">
        <p className=" font-semibold ">{ p1 }</p>
        <p className="font-regular text-center w-63 md:w-full">
          { p2 }
        </p>
      </div>
      <Button className="w-60 md:w-50 h-11">
        <PencilLine className="size-5"/>
        <Link to={ buttonLink } className="text-sm font-semibold text-neutral-25 pl-2">{ buttonTitle }</Link>
      </Button>
    </div>
  )
}
