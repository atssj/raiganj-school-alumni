import React from 'react';

interface HeroStatsProps {
  monthlyJoins: number
}

export const HeroStats: React.FC<HeroStatsProps> = ({
  monthlyJoins
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/hero/hero-stats-bg.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-white/80">

          {/* Monthly Joins */}
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10 justify-center">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img
                  key={i}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/20 object-cover"
                  src={`https://picsum.photos/100/100?random=${i + 20}`}
                  alt="Alumni"
                />
              ))}
            </div>
            <span>
              <strong className="text-white">{monthlyJoins.toLocaleString()}</strong> alumni joined this month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};