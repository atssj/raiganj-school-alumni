import React, { useEffect } from 'react';
import { X, Mail, Facebook, Linkedin, Loader } from 'lucide-react';
import { Button, Logo } from '../../../shared/components';
import { useLoginForm } from '../hooks/useLoginForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { step, email, otp, isLoading, setEmail, setOtp, sendOtp, verifyOtp, reset } = useLoginForm(onLogin);

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full hover:bg-gray-100 z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </Button>

        <div className="p-6 md:p-8">
          <Header />
          <SocialLogin onLogin={onLogin} />
          <Divider />

          {step === 'email' ? (
            <EmailStep email={email} isLoading={isLoading} onEmailChange={setEmail} onSubmit={sendOtp} />
          ) : (
            <OtpStep
              email={email}
              otp={otp}
              isLoading={isLoading}
              onOtpChange={setOtp}
              onVerify={verifyOtp}
              onChangeEmail={() => setEmail('')}
            />
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

// Sub-components
const Header: React.FC = () => (
  <div className="text-center mb-6">
    <Logo size="xl" className="mx-auto mb-4" />
    <h3 className="text-2xl font-serif font-bold text-gray-900">Welcome Back</h3>
    <p className="text-gray-500 mt-2 text-sm">Sign in to reconnect with your roots.</p>
  </div>
);

const SocialLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="space-y-3">
    <SocialButton onClick={onLogin} icon="/google.svg" label="Continue with Google" variant="white" />
    <SocialButton
      onClick={onLogin}
      icon={<Facebook className="w-5 h-5 fill-current" />}
      label="Continue with Facebook"
      variant="facebook"
    />
    <SocialButton
      onClick={onLogin}
      icon={<Linkedin className="w-5 h-5 fill-current" />}
      label="Continue with LinkedIn"
      variant="linkedin"
    />
  </div>
);

interface SocialButtonProps {
  onClick: () => void;
  icon: React.ReactNode | string;
  label: string;
  variant: 'white' | 'facebook' | 'linkedin';
}

const SocialButton: React.FC<SocialButtonProps> = ({ onClick, icon, label, variant }) => {
  const variants = {
    white: 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700',
    facebook: 'bg-[#1877F2] hover:bg-[#1864D9] text-white border-0',
    linkedin: 'bg-[#0A66C2] hover:bg-[#004182] text-white border-0',
  };

  return (
    <Button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 rounded-xl ${variants[variant]}`}
      variant="outline"
    >
      {typeof icon === 'string' ? (
        <img src={icon} className="w-5 h-5" alt="" />
      ) : (
        icon
      )}
      <span className="font-medium text-sm">{label}</span>
    </Button>
  );
};

const Divider: React.FC = () => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-100" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-white px-2 text-gray-400">Or continue with email</span>
    </div>
  </div>
);

interface EmailStepProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ email, isLoading, onEmailChange, onSubmit }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
    className="space-y-4 animate-fade-in"
  >
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        Email address
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="email"
          required
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-base md:text-sm"
          placeholder="you@example.com"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
        />
      </div>
    </div>
    <Button
      disabled={isLoading}
      className="w-full py-2.5 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2"
    >
      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Send Login Code'}
    </Button>
  </form>
);

interface OtpStepProps {
  email: string;
  otp: string;
  isLoading: boolean;
  onOtpChange: (otp: string) => void;
  onVerify: () => void;
  onChangeEmail: () => void;
}

const OtpStep: React.FC<OtpStepProps> = ({ email, otp, isLoading, onOtpChange, onVerify, onChangeEmail }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onVerify();
    }}
    className="space-y-4 animate-fade-in"
  >
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
          Enter Code
        </label>
        <Button
          type="button"
          onClick={onChangeEmail}
          variant="link"
          className="text-xs text-brand-600 font-medium p-0 h-auto"
        >
          Change email
        </Button>
      </div>
      <p className="text-xs text-gray-400 mb-3">
        We sent a 6-digit code to <span className="text-gray-900 font-medium">{email}</span>
      </p>
      <input
        type="text"
        required
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm tracking-widest text-center font-mono text-lg"
        placeholder="000000"
        value={otp}
        maxLength={6}
        onChange={e => onOtpChange(e.target.value)}
      />
    </div>
    <Button
      disabled={isLoading}
      className="w-full py-2.5 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2"
    >
      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Verify & Sign In'}
    </Button>
    <div className="text-center">
      <Button type="button" variant="link" className="text-xs text-gray-400 hover:text-gray-600 p-0 h-auto">
        Didn&apos;t receive code? Resend
      </Button>
    </div>
  </form>
);

const Footer: React.FC = () => (
  <p className="mt-6 text-center text-[10px] text-gray-400 leading-relaxed">
    By continuing, you agree to our{' '}
    <a href="#" className="underline hover:text-gray-900">
      Terms of Service
    </a>{' '}
    and{' '}
    <a href="#" className="underline hover:text-gray-900">
      Privacy Policy
    </a>
    .
  </p>
);
