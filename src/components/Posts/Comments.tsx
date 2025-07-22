import { fetchUserData } from "@/redux/slices/getUserDataSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PostImageHandler } from "./PostImageHandler";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormInput, CommentSchema } from "@/utils/validation";
import { useAddComment } from "@/hooks/useAddComment";

export const Comments = ({postId}: {postId: number}) => {
  const addCommentMutation = useAddComment();
  const dispatch: AppDispatch = useDispatch()
  const { fetchUserData_status, data, error } = useSelector((state:RootState) => state.user);

  useEffect(() => {
    if (fetchUserData_status === "idle") {
      dispatch(fetchUserData())
    }
  }, [dispatch, fetchUserData_status]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentFormInput>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: ""
    }
  })

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
     addCommentMutation.mutate(data.comment, postId)
     reset()
  }

  const userProfileImage = (
    <PostImageHandler 
      component="navbar"
      imageUrl={data.avatarUrl}
      altText="User Image"
      name={data.name}
      className="rounded-full"
      imgSize="size-10"
    />
  )

  let info;
  if (fetchUserData_status === "loading") {
    info = <p>Loading...</p>
  } else if (fetchUserData_status === "failed") {
    info = <p>Error: { error || "Failed to fetch user data." }</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold text-neutral-900">
        `Comments(...)`
      </div>
      <div className="flex flex-row items-center h-10">
        { userProfileImage ? userProfileImage : info }
        <p className="hidden md:block text-sm font-semibold text-neutral-900 pl-3">
          { data.name }
        </p>
      </div >
      <form onSubmit={handleSubmit(onSubmit)}>
        { errors && <p className="text-red-500 text-xs">{ errors["comment"]?.message }</p>}
        <label className="text-sm font-semibold">Give your Comments</label>
        <textarea 
          {...register("comment")}
          placeholder="Enter your comment"
          className="w-full min-h-35 border-1 border-neutral-300 rounded-md py-2 px-4" 
        />
        <div className="float-end">
          <Button className="w-full md:w-51 h-12" disabled={isSubmitting}>
            { isSubmitting ? "Sending..." : "Send" }
          </Button>
        </div>
      </form>
    </div>
  )
}