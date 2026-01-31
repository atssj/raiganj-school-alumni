import React, { useState } from 'react';
import { Check, CreditCard, Star, Shield, Award, Loader } from 'lucide-react';
import { Button } from '../../shared/components';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Membership: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePayment = (planName: string, amount: number) => {
    setLoading(planName);
    const razorpayKey = process.env.RAZORPAY_KEY_ID || 'rzp_test_PLACEHOLDER';

    if (razorpayKey === 'rzp_test_PLACEHOLDER') {
      setTimeout(() => {
        alert('Simulating successful payment since no key was provided.');
        setLoading(null);
      }, 1500);
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: 'INR',
      name: "রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি Alumni",
      description: `Membership: ${planName}`,
      image: 'https://ui-avatars.com/api/?name=R+H&background=8a6a5c&color=fff',
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        setLoading(null);
      },
      prefill: {
        name: 'Rahul C.',
        email: 'rahul@example.com',
        contact: '9999999999',
      },
      notes: {
        plan: planName,
      },
      theme: {
        color: '#8a6a5c',
      },
      modal: {
        ondismiss: function () {
          setLoading(null);
        },
      },
    };

    if (window.Razorpay) {
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
        setLoading(null);
      });
      rzp1.open();
    } else {
      alert('Razorpay SDK failed to load. Please check your connection.');
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-12">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
          Support Your Alma Mater
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Join the <span className="font-bengali">রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি</span> Association. Your contribution helps us
          organize reunions, maintain the school heritage, and support current students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 md:px-0">
        <AnnualPlan onJoin={() => handlePayment('Annual Plan', 500)} isLoading={loading === 'Annual Plan'} />
        <LifeMemberPlan onJoin={() => handlePayment('Life Member', 5000)} isLoading={loading === 'Life Member'} />
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-8">
        <CreditCard className="w-4 h-4" />
        <span>Secure payment processing via Razorpay Sandbox</span>
      </div>
    </div>
  );
};

// Sub-components
interface PlanProps {
  onJoin: () => void;
  isLoading: boolean;
}

const AnnualPlan: React.FC<PlanProps> = ({ onJoin, isLoading }) => (
  <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group">
    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-brand-400 transition-colors" />
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
        <Star className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">Annual Member</h3>
        <p className="text-sm text-gray-500">Perfect for recent grads</p>
      </div>
    </div>

    <div className="mb-8">
      <span className="text-4xl font-serif font-bold text-gray-900">₹500</span>
      <span className="text-gray-500"> / year</span>
    </div>

    <ul className="space-y-4 mb-8">
      <FeatureItem icon={Check}>Digital Alumni ID Card</FeatureItem>
      <FeatureItem icon={Check}>Access to Online Directory</FeatureItem>
      <FeatureItem icon={Check}>10% off on Event Tickets</FeatureItem>
      <FeatureItem icon={Check}>Monthly Newsletter</FeatureItem>
    </ul>

    <Button
      variant="outline"
      className="w-full justify-center group-hover:bg-gray-50 group-hover:border-gray-300"
      onClick={onJoin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <Loader className="w-4 h-4 mr-2 animate-spin" /> Processing...
        </span>
      ) : (
        'Join Annual Plan'
      )}
    </Button>
  </div>
);

const LifeMemberPlan: React.FC<PlanProps> = ({ onJoin, isLoading }) => (
  <div className="bg-brand-900 rounded-3xl p-6 md:p-8 border border-brand-800 shadow-xl relative overflow-hidden text-white transform translate-y-0 md:-translate-y-4">
    <div className="absolute top-0 right-0 p-4">
      <span className="bg-white/20 backdrop-blur text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-white/10">
        MOST POPULAR
      </span>
    </div>

    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />

    <div className="flex items-center gap-3 mb-6 relative z-10">
      <div className="p-3 bg-brand-800/50 rounded-xl text-brand-200 border border-brand-700">
        <Award className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">Life Member</h3>
        <p className="text-sm text-brand-300">A lifelong bond</p>
      </div>
    </div>

    <div className="mb-8 relative z-10">
      <span className="text-4xl font-serif font-bold text-white">₹5,000</span>
      <span className="text-brand-300"> / one-time</span>
    </div>

    <ul className="space-y-4 mb-8 relative z-10">
      <FeatureItem icon={Shield} variant="dark">
        Everything in Annual Plan
      </FeatureItem>
      <FeatureItem icon={Shield} variant="dark">
        Physical Membership Card & Memento
      </FeatureItem>
      <FeatureItem icon={Shield} variant="dark">
        Voting Rights in Association
      </FeatureItem>
      <FeatureItem icon={Shield} variant="dark">
        Priority Access to Reunions
      </FeatureItem>
      <FeatureItem icon={Shield} variant="dark">
        Scholarship Fund Contribution
      </FeatureItem>
    </ul>

    <Button
      variant="secondary"
      className="w-full justify-center border-none relative z-10 bg-white text-brand-900 hover:bg-brand-50"
      onClick={onJoin}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center text-brand-900">
          <Loader className="w-4 h-4 mr-2 animate-spin" /> Processing...
        </span>
      ) : (
        'Become a Life Member'
      )}
    </Button>
  </div>
);

interface FeatureItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, children, variant = 'light' }) => {
  const isDark = variant === 'dark';
  return (
    <li className={`flex items-center gap-3 text-sm ${isDark ? 'text-brand-100' : 'text-gray-600'}`}>
      <Icon className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-brand-400' : 'text-green-500'}`} />
      {children}
    </li>
  );
};
