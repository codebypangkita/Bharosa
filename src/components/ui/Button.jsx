import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon = null,
  iconPosition = 'left'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#784331]/30 focus:ring-offset-2 select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#784331] text-[#FFF9F5] hover:bg-[#613424] shadow-sm',
    sage: 'bg-[#536D4D] text-[#FFF9F5] hover:bg-[#43593e] shadow-sm',
    secondary: 'bg-[#F1E3D9] text-[#784331] hover:bg-[#E9D1C3] border border-[#E8D9D0]',
    outline: 'bg-transparent text-[#784331] border border-[#784331] hover:bg-[#E9D1C3]/30',
    ghost: 'bg-transparent text-[#784331] hover:bg-[#F1E3D9]/50',
    danger: 'bg-[#A84037] text-white hover:bg-[#8d352d]'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3.5 rounded-full gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
