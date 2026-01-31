import React, { useState } from 'react';
import { Heart, Target, TrendingUp, Shield, CreditCard } from 'lucide-react';
import { Button } from '../../shared/components';

interface Campaign {
  id: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  image: string;
  category: string;
}

const CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    title: 'Merit Scholarship Fund 2024',
    description:
      'Support meritorious students from economically weaker sections. Your contribution covers tuition, books, and uniforms.',
    raised: 350000,
    goal: 500000,
    donors: 124,
    image: 'https://images.unsplash.com/photo-1427504743055-e9dba0726309?q=80&w=800&auto=format&fit=crop',
    category: 'Education',
  },
  {
    id: '2',
    title: 'Smart Classroom Initiative',
    description:
      'Help us upgrade 5 classrooms with digital boards and projectors to bring modern learning to Raiganj.',
    raised: 120000,
    goal: 800000,
    donors: 45,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    category: 'Infrastructure',
  },
  {
    id: '3',
    title: 'Heritage Building Restoration',
    description:
      'The old red-brick block needs urgent repairs. Help us preserve the history where we all started.',
    raised: 850000,
    goal: 1500000,
    donors: 310,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop',
    category: 'Heritage',
  },
];

export const Donate: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGNS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentCampaign = CAMPAIGNS.find(c => c.id === selectedCampaign) || CAMPAIGNS[0];
  const progress = (currentCampaign.raised / currentCampaign.goal) * 100;

  const handleDonate = () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      alert(`Thank you! Generous donation of ₹${amount} received.`);
      setIsProcessing(false);
      setSelectedAmount(null);
      setCustomAmount('');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <HeaderSection />

      <CampaignSelector
        campaigns={CAMPAIGNS}
        selectedCampaign={selectedCampaign}
        onSelect={setSelectedCampaign}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DonationForm
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          currentCampaign={currentCampaign}
          progress={progress}
          isProcessing={isProcessing}
          onAmountSelect={setSelectedAmount}
          onCustomAmountChange={setCustomAmount}
          onDonate={handleDonate}
        />
        <ImpactSidebar />
      </div>
    </div>
  );
};

// Sub-components
const HeaderSection: React.FC = () => (
  <div className="text-center max-w-2xl mx-auto space-y-4">
    <h2 className="text-3xl font-serif font-bold text-gray-900">Give Back to Raiganj</h2>
    <p className="text-gray-500">
      Your contribution creates a lasting impact. Whether it&apos;s supporting a student&apos;s dream or
      preserving our heritage, every rupee counts.
    </p>
  </div>
);

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selectedCampaign: string;
  onSelect: (id: string) => void;
}

const CampaignSelector: React.FC<CampaignSelectorProps> = ({
  campaigns,
  selectedCampaign,
  onSelect,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
    {campaigns.map(campaign => (
      <CampaignCard
        key={campaign.id}
        campaign={campaign}
        isSelected={selectedCampaign === campaign.id}
        onClick={() => onSelect(campaign.id)}
      />
    ))}
  </div>
);

interface CampaignCardProps {
  campaign: Campaign;
  isSelected: boolean;
  onClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, isSelected, onClick }) => {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <button
      onClick={onClick}
      className={`w-full h-full text-left p-4 rounded-2xl border transition-all hover:shadow-md ${
        isSelected
          ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50'
          : 'border-gray-200 bg-white hover:border-brand-200'
      }`}
    >
      <div className="aspect-video w-full rounded-xl overflow-hidden mb-3">
        <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
      </div>
      <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
        {campaign.category}
      </span>
      <h3 className="font-bold text-gray-900 mt-1 mb-2 truncate">{campaign.title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>₹{campaign.raised.toLocaleString()} raised</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </button>
  );
};

interface DonationFormProps {
  selectedAmount: number | null;
  customAmount: string;
  currentCampaign: Campaign;
  progress: number;
  isProcessing: boolean;
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  onDonate: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({
  selectedAmount,
  customAmount,
  currentCampaign,
  isProcessing,
  onAmountSelect,
  onCustomAmountChange,
  onDonate,
}) => {
  const amounts = [500, 1000, 2500, 5000];

  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-100 rounded-lg text-brand-700">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Make a Donation</h3>
          <p className="text-sm text-gray-500">to {currentCampaign.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {amounts.map(amount => (
          <button
            key={amount}
            onClick={() => {
              onAmountSelect(amount);
              onCustomAmountChange('');
            }}
            className={`py-3 px-4 rounded-xl border font-medium transition-all ${
              selectedAmount === amount
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300 hover:bg-brand-50'
            }`}
          >
            ₹{amount.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Or enter custom amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
          <input
            type="number"
            value={customAmount}
            onChange={e => {
              onCustomAmountChange(e.target.value);
              onAmountSelect(0);
            }}
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            placeholder="Any amount helps"
          />
        </div>
      </div>

      <Button
        onClick={onDonate}
        disabled={isProcessing || (!selectedAmount && !customAmount)}
        className="w-full py-4 text-lg"
      >
        {isProcessing ? 'Processing...' : 'Proceed to Pay'}
      </Button>

      <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
        <Shield className="w-3 h-3" /> Secure payment via Razorpay. 80G Certificate available.
      </p>
    </div>
  );
};

const ImpactSidebar: React.FC = () => (
  <div className="bg-brand-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />

    <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Why Donate?</h3>

    <ul className="space-y-6 relative z-10">
      <ImpactItem icon={Target} title="Direct Impact">
        100% of your donation goes directly to the chosen cause. Admin costs are covered by membership
        fees.
      </ImpactItem>
      <ImpactItem icon={TrendingUp} title="Transparency">
        Receive quarterly reports on how your funds are being utilized with photos and testimonials.
      </ImpactItem>
      <ImpactItem icon={CreditCard} title="Tax Benefits">
        All donations above ₹500 are eligible for tax exemption under Section 80G.
      </ImpactItem>
    </ul>

    <div className="mt-8 pt-6 border-t border-white/10 text-center">
      <p className="text-2xl font-bold font-serif">480+</p>
      <p className="text-xs text-brand-300 uppercase tracking-widest mt-1">Alumni Donors This Year</p>
    </div>
  </div>
);

interface ImpactItemProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ icon: Icon, title, children }) => (
  <li className="flex gap-4">
    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-brand-300" />
    </div>
    <div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-brand-200 mt-1 leading-relaxed">{children}</p>
    </div>
  </li>
);
