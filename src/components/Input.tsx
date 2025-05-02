import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
}
