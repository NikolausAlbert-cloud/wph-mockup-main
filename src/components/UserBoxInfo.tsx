import UserPhoto from "@/assets/images/logo.svg";
import { DialogFormDataType } from "@/utils/validation";

type UserBoxInfoProps = {
  dialogFormData: DialogFormDataType;
};

export const UserBoxInfo = ({ dialogFormData }: UserBoxInfoProps) => {
  const avatarSrc = 
    typeof dialogFormData.avatar === "string"
    ? dialogFormData.avatar
    : dialogFormData.avatar instanceof File
    ? URL.createObjectURL(dialogFormData.avatar)
    : null;

  return (
    <div className='clamped-container flex-between gap-3 p-5 md:p-6 h-3 md:h-20'>
      <div>
        { avatarSrc ? (
          <img src={avatarSrc} alt="User Avatar" className="size-20 rounded-full object-cover" />
        ) : (
          <UserPhoto className="size:12.5 md:size-20"/>
        )} 
      </div>
      <div>
        <p className="text-sm md:text-lg font-bold text-neutral-900">{ dialogFormData.name }</p>
        <p className="text-sm md:text-md font-regular text-neutral-900">{ dialogFormData.headline }</p>
      </div>
    </div>
  )
}