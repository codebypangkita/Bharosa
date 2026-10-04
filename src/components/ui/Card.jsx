import React from 'react';

export function Card({
  children,
  variant = 'surface', // 'surface' | 'soft' | 'terracotta' | 'sage' | 'outline'
  className = '',
  onClick,
  hoverable = false
}) {
  const variants = {
    surface: 'bg-[#FFF9F5] border border-[#E8D9D0] text-[#34251F]',
    soft: 'bg-[#F1E3D9] border border-[#E8D9D0] text-[#34251F]',
    terracotta: 'bg-[#784331] text-[#FFF9F5] border border-[#613424]',
    sage: 'bg-[#536D4D] text-[#FFF9F5] border border-[#43593e]',
    outline: 'bg-transparent border border-[#E8D9D0] text-[#34251F]'
  };

  const hoverStyles = hoverable
    ? 'hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-[24px] p-6 shadow-soft ${variants[variant] || variants.surface} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
