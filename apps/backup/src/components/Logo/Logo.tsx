import React from 'react';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 30, height = 'auto', className = '' }) => {
  return (
    <div className={className} style={{ width, height, display: 'flex', alignItems: 'center' }}>
      <img
        src="/logo.png"
        alt="Raiganj Vidyachakra Alumni Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'left',
        }}
      />
    </div>
  );
};

export default Logo;
