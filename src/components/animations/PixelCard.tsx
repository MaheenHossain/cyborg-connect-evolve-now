
import React from 'react';
import './PixelCard.css';

export interface PixelCardProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'green' | 'red' | 'cyan';
  className?: string;
  onClick?: (e: React.MouseEvent) => void; // Updated to accept event parameter
}

const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  variant = 'blue', 
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`pixel-card pixel-card-${variant} ${className}`} 
      onClick={onClick}
    >
      <div className="pixel-card-inner">
        {children}
      </div>
    </div>
  );
};

export default PixelCard;
