'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/cpp/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Premium Button Component - Apple-Inspired Design
 *
 * Variants:
 * - primary: Solid background with accent color
 * - ghost: Transparent with border
 *
 * Features:
 * - Framer Motion hover animations
 * - Smooth transitions
 * - Icon support (left or right positioned)
 * - Accessible and semantic
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      children,
      className,
      icon,
      iconPosition = 'right',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-pro-accent focus:ring-offset-2 focus:ring-offset-pro-dark disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-pro-accent text-white hover:bg-pro-hover shadow-lg shadow-pro-accent/20 hover:shadow-xl hover:shadow-pro-accent/30',
      ghost:
        'bg-transparent border-2 border-pro-accent text-pro-accent hover:bg-pro-accent/10 hover:border-pro-hover',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17
        }}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
