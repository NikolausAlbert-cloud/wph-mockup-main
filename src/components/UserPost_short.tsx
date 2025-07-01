type UserPost_shortProps = {
  width: number;
};

export const UserPost_short = ({width}: UserPost_shortProps) => {
  const image;
  
  return (
    <>
      {width < 640 && image}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-neutral-900"></h1>
        <div className="flex flex-row gap-2">
          <p className="text-xs font-regular text-neutral-900 md:h-7 border-neutral-300 rounded-md px-2"></p>
        </div>
        <p className="text-sm font-regular text-neutral-900"></p>
        <div className="flex flex-row gap-3 text-xs font-regular text-neutral-700">
          <p>Created...</p>
          <p className="bg-neutral-300 w-[1px] h-4"/>
          <p>Last updated...</p>
        </div>
        <div className="flex flex-row gap-3">
          <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">Statistic</button>
          <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">Edit</button>
          <button className="text-pimary-300 text-sm font-semibold underline underline-offset-4 cursor-pointer">Delete</button>
        </div>
      </div>
    </>
  )
}
