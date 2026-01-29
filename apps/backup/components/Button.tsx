import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/20 focus:ring-brand-500",
    secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200 focus:ring-brand-500",
    outline: "border border-brand-200 bg-transparent hover:bg-brand-50 text-brand-700 focus:ring-brand-500",
    ghost: "bg-transparent hover:bg-brand-50 text-brand-700 hover:text-brand-900 focus:ring-brand-500",
    white: "bg-white text-brand-900 hover:bg-brand-50 shadow-sm focus:ring-white/50",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};