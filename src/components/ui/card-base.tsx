import React from 'react';
import { cn } from '@/functions'; // Assuming 'cn' is a utility for conditional classNames

interface CardBaseProps {
  children: React.ReactNode;
  className?: string;
  imageSlot?: React.ReactNode;
  titleSlot?: React.ReactNode;
  onClick?: () => void;
}

export const CardBase: React.FC<CardBaseProps> = ({
  children,
  className,
  imageSlot,
  titleSlot,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'bg-black/30 border border-red-500/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      {imageSlot && <div className="relative">{imageSlot}</div>}
      <div className="p-4">
        {titleSlot && <div className="mb-2">{titleSlot}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CardBase;
