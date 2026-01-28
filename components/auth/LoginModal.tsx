import React, { useState, useEffect } from 'react';
import { X, Mail, Facebook, Linkedin, Loader } from 'lucide-react';
import { Button } from '../Button';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep('email');
            setEmail('');
            setOtp('');
            setIsLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;
    
    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if(!email) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
        }, 800);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if(!otp) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 800);
    };
    
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}></div>
             <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="p-6 md:p-8">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl mx-auto mb-4 shadow-lg shadow-brand-600/20">R</div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900">Welcome Back</h3>
                        <p className="text-gray-500 mt-2 text-sm">Sign in to reconnect with your roots.</p>
                    </div>

                    <div className="space-y-3">
                        <button onClick={onLogin} className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            <span className="font-medium text-gray-700 text-sm">Continue with Google</span>
                        </button>
                        <button onClick={onLogin} className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white p-2.5 rounded-xl hover:bg-[#1864D9] transition-all">
                            <Facebook className="w-5 h-5 fill-current" />
                            <span className="font-medium text-sm">Continue with Facebook</span>
                        </button>
                        <button onClick={onLogin} className="w-full flex items-center justify-center gap-3 bg-[#0A66C2] text-white p-2.5 rounded-xl hover:bg-[#004182] transition-all">
                            <Linkedin className="w-5 h-5 fill-current" />
                            <span className="font-medium text-sm">Continue with LinkedIn</span>
                        </button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-400">Or continue with email</span>
                        </div>
                    </div>

                    {step === 'email' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
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
                            <Button disabled={isLoading} className="w-full py-2.5 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2">
                                {isLoading ? <Loader className="w-4 h-4 animate-spin"/> : 'Send Login Code'}
                            </Button>
                        </form>
                    ) : (
                         <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fade-in">
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Enter Code</label>
                                    <button type="button" onClick={() => setStep('email')} className="text-xs text-brand-600 font-medium hover:underline">Change email</button>
                                </div>
                                <p className="text-xs text-gray-400 mb-3">We sent a 6-digit code to <span className="text-gray-900 font-medium">{email}</span></p>
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
                            <Button disabled={isLoading} className="w-full py-2.5 rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center gap-2">
                                {isLoading ? <Loader className="w-4 h-4 animate-spin"/> : 'Verify & Sign In'}
                            </Button>
                             <div className="text-center">
                                <button type="button" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Didn't receive code? Resend</button>
                            </div>
                        </form>
                    )}

                    <p className="mt-6 text-center text-[10px] text-gray-400 leading-relaxed">
                        By continuing, you agree to our <a href="#" className="underline hover:text-gray-900">Terms of Service</a> and <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
                    </p>
                </div>
             </div>
        </div>
    );
};