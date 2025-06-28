import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { signInForm_data } from '@/constants/signInForm_data';
import { SignInFormData, SignInSchema } from '@/utils/validation';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postLogin } from '@/api/login';

export const SignInForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postLogin({
        payload: data
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", data.email);
      
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      setError("Error: An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
    {signInForm_data.map((data, i) => {
      const fieldName = data.label.toLowerCase() as keyof SignInFormData;
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
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  )
}