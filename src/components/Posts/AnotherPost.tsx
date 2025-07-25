import { UserPost_short } from '../UserPost_short'

export const AnotherPost = () => {
  return (
    <div className="py-4 border-t-[1px] border-neutral-300">
      <h1 className="text-xl font-bold pb-4">Another Post</h1>
      <UserPost_short source="anotherPost" />
    </div>
  )
}
