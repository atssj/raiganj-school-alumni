import { useState, useCallback } from 'react';

export type LoginStep = 'email' | 'otp';

export interface LoginFormState {
  step: LoginStep;
  email: string;
  otp: string;
  isLoading: boolean;
}

export interface LoginFormActions {
  setEmail: (email: string) => void;
  setOtp: (otp: string) => void;
  sendOtp: () => Promise<void>;
  verifyOtp: () => Promise<void>;
  reset: () => void;
}

export const useLoginForm = (onLogin: () => void): LoginFormState & LoginFormActions => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmailState] = useState('');
  const [otp, setOtpState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setStep('email');
    setEmailState('');
    setOtpState('');
    setIsLoading(false);
  }, []);

  const setEmail = useCallback((value: string) => setEmailState(value), []);
  const setOtp = useCallback((value: string) => setOtpState(value), []);

  const sendOtp = useCallback(async () => {
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    setStep('otp');
  }, [email]);

  const verifyOtp = useCallback(async () => {
    if (!otp) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onLogin();
  }, [otp, onLogin]);

  return {
    step,
    email,
    otp,
    isLoading,
    setEmail,
    setOtp,
    sendOtp,
    verifyOtp,
    reset,
  };
};
