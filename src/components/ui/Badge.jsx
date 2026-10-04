import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon: Icon = null
}) {
  const variantStyles = {
    neutral: 'bg-[#F1E3D9] text-[#784331] border border-[#E8D9D0]',
    terracotta: 'bg-[#784331] text-[#FFF9F5]',
    sage: 'bg-[#E5EEE2] text-[#426C4D] border border-[#89A27D]/30',
    sageDark: 'bg-[#536D4D] text-[#FFF9F5]',
    warning: 'bg-[#F5EBD6] text-[#A56B25] border border-[#A56B25]/20',
    danger: 'bg-[#F7E4DF] text-[#A84037] border border-[#A84037]/25',
    outline: 'border border-[#784331] text-[#784331] bg-transparent'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 rounded-full font-medium',
    md: 'text-xs px-3 py-1 rounded-full font-medium tracking-wide',
    lg: 'text-sm px-4 py-1.5 rounded-full font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 transition-colors ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
