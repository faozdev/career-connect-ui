import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const baseStyle = 'px-4 py-2 rounded text-white';
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-500 hover:bg-gray-600',
  };

  return (
    <button className={`${baseStyle} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}
