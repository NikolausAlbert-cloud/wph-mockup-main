import { SignInForm } from '@/components/SignInForm'
import { Link } from 'react-router-dom'

export const SignInForm_page = () => {
  return (
    <div className="min-h-screen flex-center">
      <div className="p-6 bg-white border-[1px] border-neutral-200 rounded-xl w-100">
        <h2 className="text-xl font-bold text-neutral-900 mb-5">Sign In</h2>
        <SignInForm />
        <p className="text-sm font-regular text-neutral-950 text-center mt-4">
          Don&apos;t have an account?{" "}<Link to="/auth/register" className="text-sm font-bold text-primary-300">Register</Link>
        </p>
      </div>
    </div>
  )
}
