import React from 'react';
import { Mail, Facebook, Linkedin, Loader, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Logo } from '../../shared/components';
import { useAuth } from './components/ProtectedRoute';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [step, setStep] = React.useState<'email' | 'otp'>('email');
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const redirect = searchParams.get('redirect') || '/dashboard';
  const isAdminLogin = redirect.includes('/admin');

  const handleSendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(isAdminLogin);
      navigate(redirect);
    }, 1000);
  };

  const handleSocialLogin = () => {
    login(isAdminLogin);
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="lg" />
            <div className="flex flex-col">
              <span className="font-bengali text-lg font-bold text-gray-900 leading-none">
                রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-600 font-bold">
                Alumni Network
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Logo size="xl" className="mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                {isAdminLogin ? 'Admin Access' : 'Welcome Back'}
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {isAdminLogin
                  ? 'Sign in to access the admin dashboard'
                  : 'Sign in to reconnect with your roots'}
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <SocialButton
                onClick={handleSocialLogin}
                icon="/google.svg"
                label="Continue with Google"
                variant="white"
              />
              <SocialButton
                onClick={handleSocialLogin}
                icon={<Facebook className="w-5 h-5 fill-current" />}
                label="Continue with Facebook"
                variant="facebook"
              />
              <SocialButton
                onClick={handleSocialLogin}
                icon={<Linkedin className="w-5 h-5 fill-current" />}
                label="Continue with LinkedIn"
                variant="linkedin"
              />
            </div>

            <Divider />

            {/* Email/OTP Form */}
            {step === 'email' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendOtp();
                }}
                className="space-y-4"
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
                      onChange={(e) => setEmail(e.target.value)}
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
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyOtp();
                }}
                className="space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Enter Code
                    </label>
                    <Button
                      type="button"
                      onClick={() => setStep('email')}
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
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Verify & Sign In'}
                </Button>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-xs text-gray-400 hover:text-gray-600 p-0 h-auto"
                  >
                    Didn&apos;t receive code? Resend
                  </Button>
                </div>
              </form>
            )}

            <p className="mt-6 text-center text-[10px] text-gray-400 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-900">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-gray-900">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
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
