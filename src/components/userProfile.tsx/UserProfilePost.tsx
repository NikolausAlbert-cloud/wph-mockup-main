import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const UserProfilePost = () => {
  return (
    <div className="flex flex-col-reverse md:justify-between md:items-center md:flex-row-reverse">
      <p className="text-lg md:text-xl font-bold text-neutral-900 max-md:border-t max-md:border-neutral-300 max-md:pt-4">Post</p>
      <Button className="w-full md:w-45.5 max-md:mb-4">
        <PencilLine className="size-5 "/>
        <Link to="/posts" className="pl-2 text-sm font-semibold text-neutral-25">
          Write Posttt
        </Link>
      </Button>
    </div>
  )
}
