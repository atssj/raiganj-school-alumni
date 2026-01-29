import { useState, useCallback } from 'react';

export interface LoginModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useLoginModal = (): LoginModalState => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};
