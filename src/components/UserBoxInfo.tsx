import UserPhoto from "@/assets/images/person-laptop.svg";
import { DialogFormDataType } from "@/utils/validation";
import { PostImageHandler } from "./Posts/PostImageHandler";

type UserBoxInfoProps = {
  dialogFormData: DialogFormDataType;
};

export const UserBoxInfo = ({ dialogFormData }: UserBoxInfoProps) => {
  const avatarSrc = 
    typeof dialogFormData.avatar === "string"
    ? dialogFormData.avatar
    : dialogFormData.avatar instanceof File
    ? URL.createObjectURL(dialogFormData.avatar)
    : dialogFormData.name;

  console.log("userboxINfo avatarSrc ", typeof(avatarSrc), dialogFormData)

   const mainPostImage = (
    <PostImageHandler
      name={dialogFormData.name}
      component="userboxinfo"
      imageUrl={avatarSrc}
      altText="Post Image"
      className="size-20 rounded-full object-cover"
    />
  );

  return (
    <div className='flex-between gap-3 h-3 md:h-20'>
    { avatarSrc ? (
      mainPostImage
    ) : (
      <UserPhoto className="size:12.5 md:size-20"/>
    )} 
      <div>
        <p className="text-sm md:text-lg font-bold text-neutral-900">{ dialogFormData.name }</p>
        <p className="text-sm md:text-md font-regular text-neutral-900">{ dialogFormData.headline }</p>
      </div>
    </div>
  )
}