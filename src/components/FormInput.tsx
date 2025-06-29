import React from 'react'

type FormInputProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
};

export const FormInput: React.FC<FormInputProps> = ({ label, htmlFor, error, children }) => {
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-neutral-950 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}