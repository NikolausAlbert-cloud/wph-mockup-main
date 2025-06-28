import { SignUpForm } from '@/components/SignUpForm'
import { Link } from "react-router-dom"
 
export const SignUpForm_page = () => {
  return (
    <div className="min-h-screen flex-center">
      <div className="p-6 bg-white border-[1px] border-neutral-200 rounded-xl w-100">
        <h2 className="text-xl font-bold text-neutral-900 mb-5">Sign Up</h2>
        <SignUpForm />
        <p className="text-sm font-regular text-neutral-950 text-center mt-4">
          Already have an account?{" "}<Link to="/auth/login" className="text-sm font-bold text-primary-300">Log in</Link>
        </p>
      </div>
    </div>
  )
}
