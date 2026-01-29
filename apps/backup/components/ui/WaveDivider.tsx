import React from 'react';

interface WaveDividerProps {
  className?: string;
  fillColor?: string;
  height?: string;
  flip?: boolean;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  className = '',
  fillColor = 'currentColor',
  height = 'h-12 md:h-20',
  flip = false,
}) => {
  const pathData = 'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z';
  
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg 
        className={`w-full ${height}`} 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      >
        <path d={pathData} fill={fillColor} />
      </svg>
    </div>
  );
};

export default WaveDivider;
