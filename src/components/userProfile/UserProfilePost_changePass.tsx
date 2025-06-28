import { changePassword_data } from '@/constants/changePassword_data'
import { ChangePasswordData, ChangePasswordSchema } from '@/utils/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { patchChangePassword } from '@/api/changePassword'

export const UserProfilePost_changePass = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: ""
    }
  });

  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const response = await patchChangePassword({
        payload: {
          currentPassword: data.currentpassword,
          newPassword: data.newpassword,
          confirmPassword: data.confirmpassword
        }
      });
      
      if (response.success) {
        setInfo("Password changed successfully");
      };
      reset();
    } catch (err) {
      console.error("Change Password error:", err)
      setError("Error: An error occurred during change password. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "clamp(22.56rem, 37.36vw, 33.62rem)" }}>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {info && <p className="text-primary-300 text-sm">{info}</p>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">  
      {changePassword_data.map((data, i) => {
        const fieldName = data.label.toLowerCase().split(" ").join("") as keyof ChangePasswordData;
        return (
        <FormInput key={i} label={data.label} error={errors[fieldName]?.message}>
          <input 
          {...register(fieldName)} 
          placeholder={data.placeholder} 
          type={data.type}
          className={`w-full py-2.5 px-4 border ${errors[fieldName]?"border-red-500":"border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`} />
        </FormInput>
        )
      })}
  
        <button type="submit" className="w-full bg-primary-300 text-sm font-semibold text-neutral-25 py-2.5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
          {loading ? "Updated..." : "Update Password"}
        </button>
      </form>
    </div>
  )
}
