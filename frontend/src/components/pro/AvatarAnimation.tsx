'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AvatarAnimationProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

/**
 * AvatarAnimation Component - Premium Animated Avatar
 *
 * Features:
 * - Centered avatar with Next.js Image optimization
 * - Animated concentric circles using Framer Motion
 * - Staggered animation delays for visual depth
 * - Smooth infinite loop animations
 * - Fallback to initials if no image provided
 *
 * Inspired by Apple's subtle, elegant animations
 */
export const AvatarAnimation: React.FC<AvatarAnimationProps> = ({
  name,
  imageUrl,
  size = 320,
}) => {
  // Extract initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  // Define concentric circle animation configurations
  const circles = [
    {
      delay: 0,
      duration: 4,
      scale: [1, 1.3, 1],
      opacity: [0.05, 0.15, 0.05],
      size: size * 1.2,
    },
    {
      delay: 1.3,
      duration: 4,
      scale: [1, 1.3, 1],
      opacity: [0.05, 0.15, 0.05],
      size: size * 1.4,
    },
    {
      delay: 2.6,
      duration: 4,
      scale: [1, 1.3, 1],
      opacity: [0.05, 0.15, 0.05],
      size: size * 1.6,
    },
  ];

  return (
    <div className="relative flex items-center justify-center">
      {/* Animated Concentric Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full border border-pro-light/10"
            style={{
              width: circle.size,
              height: circle.size,
            }}
            animate={{
              scale: circle.scale,
              opacity: circle.opacity,
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              delay: circle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Avatar Container */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1], // Custom easing for smooth entrance
        }}
      >
        {/* Subtle glow effect */}
        <div className="absolute -inset-4 bg-pro-accent/5 rounded-full blur-2xl" />

        {/* Avatar */}
        <div
          className="relative rounded-full overflow-hidden bg-gradient-to-br from-pro-accent to-pro-accent/60 shadow-2xl shadow-pro-accent/10"
          style={{ width: size, height: size }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              priority
              sizes={`${size}px`}
            />
          ) : (
            // Fallback to initials
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-white font-extrabold tracking-tight"
                style={{ fontSize: size * 0.35 }}
              >
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Subtle ring accent */}
        <div className="absolute inset-0 rounded-full ring-1 ring-pro-light/5" />
      </motion.div>
    </div>
  );
};
