import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyle = "font-bold rounded-2xl shadow-lg transform transition-all active:scale-95 active:shadow-sm flex items-center justify-center gap-2 border-b-4";
  
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-400 text-white border-blue-700",
    secondary: "bg-purple-500 hover:bg-purple-400 text-white border-purple-700",
    success: "bg-green-500 hover:bg-green-400 text-white border-green-700",
    danger: "bg-red-500 hover:bg-red-400 text-white border-red-700",
    neutral: "bg-white hover:bg-gray-50 text-gray-800 border-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
    xl: "px-10 py-6 text-2xl w-full",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {icon && <span className="animate-pulse">{icon}</span>}
      {children}
    </button>
  );
};