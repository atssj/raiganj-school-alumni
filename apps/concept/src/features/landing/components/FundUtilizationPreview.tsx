import React from 'react';
import { ViewState } from '../../../shared/types';
import { Button, Reveal } from '../../../shared/components';
import { MOCK_FUND_STATS, MOCK_FUND_PROJECTS } from '../../../data/mocks';
import { IndianRupee, Users, CheckCircle, Heart } from 'lucide-react';

interface FundUtilizationPreviewProps {
  onNavigate: (view: ViewState) => void;
}

export const FundUtilizationPreview: React.FC<FundUtilizationPreviewProps> = ({ onNavigate }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 md:py-32 bg-brand-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Making a Real Impact
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Your contributions are driving tangible change in our alma mater. From infrastructure upgrades to student scholarships,
              every rupee is accounted for and utilized transparently.
            </p>
          </div>
        </Reveal>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatCard 
            icon={IndianRupee} 
            value={formatCurrency(MOCK_FUND_STATS.totalSpent)} 
            label="Funds Utilized" 
            color="text-emerald-600"
            bgColor="bg-emerald-100"
          />
          <StatCard 
            icon={CheckCircle} 
            value={MOCK_FUND_STATS.completedProjects.toString()} 
            label="Projects Completed" 
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard 
            icon={Users} 
            value={MOCK_FUND_STATS.beneficiariesHelped.toString() + "+"} 
            label="Students Benefited" 
            color="text-amber-600"
            bgColor="bg-amber-100"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_FUND_PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 100}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col group">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-brand-800">
                    {project.status}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Invested</span>
                      <span className="font-bold text-gray-900">{formatCurrency(project.amountSpent)}</span>
                    </div>
                     <div className="flex flex-col text-right">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">Beneficiaries</span>
                      <span className="font-bold text-gray-900">{project.beneficiaries}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
                size="lg"
                onClick={() => onNavigate(ViewState.DONATE)}
                className="rounded-full px-8 bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-900/20 flex items-center justify-center"
            >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Donate Now
            </Button>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, label, color, bgColor }: any) => (
    <Reveal>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900 font-serif">{value}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
            </div>
        </div>
    </Reveal>
)
