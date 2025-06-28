import React from 'react'

type FormInputProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export const FormInput: React.FC<FormInputProps> = ({ label, error, children }) => {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-neutral-950 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}