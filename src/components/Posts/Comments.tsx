import { fetchUserData } from "@/redux/slices/getUserDataSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PostImageHandler } from "./PostImageHandler";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormInput, CommentSchema } from "@/utils/validation";
import { addComment } from "@/redux/slices/commentSlice";

export const Comments = ({postId}: {postId: number}) => {
  const dispatch: AppDispatch = useDispatch()
  const [ isSending, setIsSending ] = useState(false);
  const [ addCommentError, setAddCommentError ] = useState("");
  const [ addCommentSuccess, setAddCommentSucess ] = useState("");
  const { fetchUserData_status, data: userData, error } = useSelector((state:RootState) => state.user);
  const { data: commentData, addComment_status } = useSelector((state:RootState) => state.comment);
  
  useEffect(() => {
    if (fetchUserData_status === "idle") {
      dispatch(fetchUserData())
    }
  }, [dispatch, fetchUserData_status]);

  useEffect(() => {
    if (addComment_status === "loading") {
      setIsSending(true);
    } else {
      setIsSending(false);
    }
  }, [addComment_status]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormInput>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: ""
    }
  });

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    setAddCommentError("");
    setAddCommentSucess("");

    const response = await dispatch(addComment({
    postId,
    comment: data.comment
    }));

    if (response.meta.requestStatus === "fulfilled") {
      setAddCommentSucess("Comment added successfully");
    }
    else {
      setAddCommentError("Failed to add new comment");
    }
    reset()
  }

  const userProfileImage = (
    <PostImageHandler 
      component="navbar"
      imageUrl={userData.avatarUrl}
      altText="User Image"
      name={userData.name}
      className="size-10 rounded-full"
    />
  )

  let info;
  if (fetchUserData_status === "loading") {
    info = <p className="py-2">Loading...</p>
  } else if (fetchUserData_status === "failed") {
    info = <p className="py-2 text-red-500">Error: { error || "Failed to fetch user data." }</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-bold text-neutral-900">
        Comments ({ commentData.length || 0 })
      </div>
      <div className="flex flex-row gap-2.5 items-center h-10">
        { userProfileImage ? userProfileImage : info }
        <p className="hidden md:block text-sm font-semibold text-neutral-900 pl-3">
          { userData.name }
        </p>
      </div >
      <form onSubmit={handleSubmit(onSubmit)}>
        { errors && <p className="text-red-500 text-xs">{ errors["comment"]?.message }</p>}
        { addCommentError && <p className="text-red-500 text-xs">{ addCommentError }</p>}
        { addCommentSuccess && <p className="text-primary-300 text-xs">{ addCommentSuccess }</p>}
        <label className="text-sm font-semibold">Give your Comments</label>
        <textarea 
          {...register("comment")}
          placeholder="Enter your comment"
          className="w-full min-h-35 border-1 border-neutral-300 rounded-md py-2 px-4" 
        />
        <div className="flex max-sm:justify-center justify-end">
          <Button className="max-sm:w-full w-51 h-12" disabled={isSending} type="submit" >
            { isSending ? "Sending..." : "Send" }
          </Button>
        </div>
      </form>
    </div>
  )
}