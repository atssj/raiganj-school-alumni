import React, { useMemo } from 'react';
import { cn } from '../lib/utils';

interface CopyrightProps {
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({ className }) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <p className={cn("font-bengali", className)}>
      &copy; {currentYear} রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
    </p>
  );
};
