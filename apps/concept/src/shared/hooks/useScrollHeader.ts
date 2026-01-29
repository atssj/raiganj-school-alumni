import { useState, useEffect } from 'react';

export interface ScrollHeaderState {
  isScrolled: boolean;
}

export const useScrollHeader = (threshold: number = 20): ScrollHeaderState => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isScrolled };
};
