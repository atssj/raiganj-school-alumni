import React, { useState, memo } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const sizes: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
  '3xl': 'w-24 h-24 text-3xl'
};

export const Logo: React.FC<LogoProps> = memo(({ 
  className = '', 
  size = 'md' 
}) => {
  const [hasError, setHasError] = useState(false);
  const sizeKey = size in sizes ? size : 'md';
  
  return hasError ? (
    <div 
      className={`${sizes[sizeKey as keyof typeof sizes]} rounded-xl flex items-center justify-center font-serif font-bold shadow-lg bg-brand-600 text-white ${className}`}
    >
      R
    </div>
  ) : (
    <img 
      src="/logo.png" 
      alt="রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি"
      className={`${sizes[sizeKey as keyof typeof sizes]} object-contain ${className}`}
      onError={() => setHasError(true)}
    />
  );
});

Logo.displayName = 'Logo';
