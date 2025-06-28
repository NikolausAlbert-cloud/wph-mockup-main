import { changeProfile } from "@/api/changeProfile";
import Camera from "@/assets/images/camera.svg";
import UserPhoto from "@/assets/images/logo.svg";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserProfileDialog_data } from '@/constants/userProfileDialog_data';
import { DialogFormDataType } from "@/pages/UserProfile_page";
import { UserProfileDialogData, UserProfileDialogSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

type UserProfileDialogProps = {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
  dialogFormData: DialogFormDataType;
  onProfileUpdated?: () => void;
};

export const UserProfile_dialog = ({
  isOpenDialog, 
  setIsOpenDialog, 
  dialogFormData,
  onProfileUpdated, 
}: UserProfileDialogProps ) => {
  // console.log("Dialog Form Data:", dialogFormData);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ avatarPreview, setAvatarPreview ] = useState(dialogFormData.avatar || null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    setValue
  } = useForm<UserProfileDialogData>({
      resolver: zodResolver(UserProfileDialogSchema),
      defaultValues: {
        name: dialogFormData.name,
        headline: dialogFormData.headline,
        avatar: "", 
      }
  });

  useEffect(() => {
    reset({
      name: dialogFormData.name,
      headline: dialogFormData.headline,
      avatar: dialogFormData.avatar || "",
    });
    setAvatarPreview(dialogFormData.avatar || null); 
  }, [dialogFormData, reset]); 

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setValue("avatar", file); 
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null); 
      setValue("avatar", "");
    }
  };

  const onSubmit:SubmitHandler<UserProfileDialogData> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      if (data.headline) {
        formData.append("headline", data.headline);
      }
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      for (const pair of formData.entries()) { console.log(pair[0], pair[1]); }

      const response = await changeProfile({
        payload: formData
      });
      // console.log("Response from changeProfile:", response);
      if (response.avatarUrl) { 
        setAvatarPreview(response.avatarUrl);
      }

      setIsOpenDialog(false);
      if (onProfileUpdated) {
        onProfileUpdated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  // console.log(avatarPreview, "Avatar Preview");
  return (
    <div>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
          <p className="text-xs md:text-sm font-semibold text-primary-300 underline underline-offset-3 cursor-pointer">
            Edit Profile
          </p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex-start">
              <DialogTitle className="text-md font-bold md:text-xl-bold text-neutral-950">
                Edit Profile
              </DialogTitle>
            </div>
          </DialogHeader>
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
          { error && <p className="text-red-500 text-sm">{error instanceof Error ? error.message : String(error)}</p> }
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="relative flex-center cursor-pointer">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="User Avatar" className="size-20 rounded-full object-cover" />
                ) : (
                  <UserPhoto className="size-20" />
                )}
                <Camera className="absolute left-1/2 translate-x-[58%] top-1/2 translate-y-[87.5%] size-6" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*" 
                  {...register("avatar")} 
                  onChange={handleAvatarChange}
                  className="hidden" 
                />
              </div>
              
              {UserProfileDialog_data.map((data, i) => {
                const fieldName = data.subtitle.toLowerCase() as keyof DialogFormDataType;
                return (
                  <FormInput key={i} label={data.title} error={errors[fieldName]?.message}>
                    <input 
                      {...register(fieldName)} 
                      className={`w-full py-2.5 px-4 border ${errors[fieldName]?"border-red-500":"border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`} 
                    />
                  </FormInput>
                )
              })}
              <button 
                type="submit" 
                className="w-full bg-primary-300 text-sm font-semibold text-neutral-25 py-2.5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
           
        </DialogContent>
      </Dialog>
    </div>
  )
}
