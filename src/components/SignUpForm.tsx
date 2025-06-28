import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './FormInput';
import { signUpForm_data } from '@/constants/signUpForm_data';
import { SignUpFormData, SignUpSchema } from '@/utils/validation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '@/api/register';

export const SignUpForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
  });
  
  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await postRegister({
        payload: data
      });

      navigate("/");
    
    } catch (err) {
      console.error("Registration error:", err);
      setError("Error: An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {signUpForm_data.map((data, i) => {
       const fieldName = data.label.toLowerCase() as keyof SignUpFormData;
       return (
      <FormInput key={i} label={data.label} error={errors[fieldName]?.message}>
        <input 
        {...register(fieldName)} 
        placeholder={data.placeholder} 
        type={data.type}
        className={`w-full py-2.5 px-4 border ${errors[fieldName]?"border-red-500":"border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`} />
      </FormInput>
    )})}

      <button type="submit" className="w-full bg-primary-300 text-sm font-semibold text-neutral-25 py-2.5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  )
}