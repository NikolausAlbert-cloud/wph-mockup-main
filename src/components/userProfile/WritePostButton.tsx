import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const WritePostButton = () => {
  return (
    <>
      <Button className="w-full md:w-45.5 max-md:mb-4">
        <PencilLine className="size-5 "/>
        <Link to="/posts" className="pl-2 text-sm font-semibold text-neutral-25">
          Write Post
        </Link>
      </Button>
    </>
  )
}
