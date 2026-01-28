import React, { useState } from 'react';
import { Heart, Target, TrendingUp, Shield, CreditCard, CheckCircle, Loader } from 'lucide-react';
import { Button } from './Button';

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
        description: 'Support meritorious students from economically weaker sections. Your contribution covers tuition, books, and uniforms.',
        raised: 350000,
        goal: 500000,
        donors: 124,
        image: 'https://images.unsplash.com/photo-1427504743055-e9dba0726309?q=80&w=800&auto=format&fit=crop',
        category: 'Education'
    },
    {
        id: '2',
        title: 'Smart Classroom Initiative',
        description: 'Help us upgrade 5 classrooms with digital boards and projectors to bring modern learning to Raiganj.',
        raised: 120000,
        goal: 800000,
        donors: 45,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        category: 'Infrastructure'
    },
    {
        id: '3',
        title: 'Heritage Building Restoration',
        description: 'The old red-brick block needs urgent repairs. Help us preserve the history where we all started.',
        raised: 850000,
        goal: 1500000,
        donors: 310,
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop',
        category: 'Heritage'
    }
];

export const Donate: React.FC = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState<string>(CAMPAIGNS[0].id);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDonate = () => {
        const amount = selectedAmount || Number(customAmount);
        if (!amount || amount <= 0) return;

        setIsProcessing(true);
        // Simulate payment
        setTimeout(() => {
            alert(`Thank you! Generous donation of ₹${amount} received.`);
            setIsProcessing(false);
            setSelectedAmount(null);
            setCustomAmount('');
        }, 1500);
    };

    const currentCampaign = CAMPAIGNS.find(c => c.id === selectedCampaign) || CAMPAIGNS[0];
    const progress = (currentCampaign.raised / currentCampaign.goal) * 100;

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Give Back to Raiganj</h2>
                <p className="text-gray-500">
                    Your contribution creates a lasting impact. Whether it's supporting a student's dream or preserving our heritage, every rupee counts.
                </p>
            </div>

            {/* Campaign Selector */}
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                {CAMPAIGNS.map(campaign => (
                    <button
                        key={campaign.id}
                        onClick={() => setSelectedCampaign(campaign.id)}
                        className={`min-w-[280px] md:min-w-[320px] text-left p-4 rounded-2xl border transition-all snap-center ${
                            selectedCampaign === campaign.id 
                            ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50' 
                            : 'border-gray-200 bg-white hover:border-brand-200'
                        }`}
                    >
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-3">
                            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{campaign.category}</span>
                        <h3 className="font-bold text-gray-900 mt-1 mb-2 truncate">{campaign.title}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                            <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${(campaign.raised/campaign.goal)*100}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>₹{campaign.raised.toLocaleString()} raised</span>
                            <span>{Math.round((campaign.raised/campaign.goal)*100)}%</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Donation Area */}
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
                        {[500, 1000, 2500, 5000].map(amount => (
                            <button
                                key={amount}
                                onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
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
                                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                                placeholder="Any amount helps"
                            />
                        </div>
                    </div>

                    <Button 
                        onClick={handleDonate}
                        disabled={isProcessing || (!selectedAmount && !customAmount)}
                        className="w-full py-4 text-lg"
                    >
                        {isProcessing ? (
                            <span className="flex items-center gap-2">
                                <Loader className="w-5 h-5 animate-spin" /> Processing...
                            </span>
                        ) : 'Proceed to Pay'}
                    </Button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                        <Shield className="w-3 h-3" /> Secure payment via Razorpay. 80G Certificate available.
                    </p>
                </div>

                {/* Impact Sidebar */}
                <div className="bg-brand-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    
                    <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Why Donate?</h3>
                    
                    <ul className="space-y-6 relative z-10">
                        <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Target className="w-4 h-4 text-brand-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Direct Impact</h4>
                                <p className="text-xs text-brand-200 mt-1 leading-relaxed">
                                    100% of your donation goes directly to the chosen cause. Admin costs are covered by membership fees.
                                </p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-4 h-4 text-brand-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Transparency</h4>
                                <p className="text-xs text-brand-200 mt-1 leading-relaxed">
                                    Receive quarterly reports on how your funds are being utilized with photos and testimonials.
                                </p>
                            </div>
                        </li>
                         <li className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-4 h-4 text-brand-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Tax Benefits</h4>
                                <p className="text-xs text-brand-200 mt-1 leading-relaxed">
                                    All donations above ₹500 are eligible for tax exemption under Section 80G.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-2xl font-bold font-serif">480+</p>
                        <p className="text-xs text-brand-300 uppercase tracking-widest mt-1">Alumni Donors This Year</p>
                    </div>
                </div>
            </div>
        </div>
    );
};