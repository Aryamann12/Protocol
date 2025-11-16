'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from './Button';
import { AvatarAnimation } from './AvatarAnimation';
import { personalInfo } from '@/src/data/content';

/**
 * Hero Component - Premium Apple-Inspired Landing Section
 *
 * Design Philosophy:
 * - Massive, bold typography for immediate impact
 * - Clean two-column grid layout (text left, visual right)
 * - Subtle animations that enhance without distracting
 * - Professional color palette with precise spacing
 * - Perfect balance of information and white space
 *
 * Layout Structure:
 * - Full viewport height with centered content
 * - Responsive grid (stacks on mobile, 2-column on desktop)
 * - Left: Name + Bio + CTAs
 * - Right: Animated avatar with concentric circles
 */
export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Apple's signature easing
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-pro-dark overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pro-darker via-pro-dark to-pro-dark" />

      {/* Ambient glow effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pro-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pro-accent/3 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Typography & CTAs */}
          <div className="space-y-8">
            {/* Name - The dominant visual anchor */}
            <motion.div variants={itemVariants}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-pro-light">
                {personalInfo.name.split(' ')[0]}
                <br />
                <span className="bg-gradient-to-r from-pro-light to-pro-secondary bg-clip-text text-transparent">
                  {personalInfo.name.split(' ')[1]}
                </span>
              </h1>
            </motion.div>

            {/* Bio - Elegant contrast */}
            <motion.div variants={itemVariants} className="max-w-lg">
              <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
                {personalInfo.tagline}
              </p>
            </motion.div>

            {/* Professional Context */}
            <motion.div variants={itemVariants} className="max-w-lg">
              <p className="text-base md:text-lg font-light text-pro-secondary leading-relaxed">
                Senior AI Data Scientist at{' '}
                <span className="text-pro-accent font-medium">GEP</span>
                , architecting production-grade ML systems and driving AI
                innovation for enterprise procurement intelligence.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                variant="primary"
                onClick={() => scrollToSection('journey')}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                View My Journey
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  // TODO: Add CV download logic
                  console.log('Download CV');
                }}
                icon={<Download className="w-5 h-5" />}
                iconPosition="left"
              >
                Download CV
              </Button>
            </motion.div>

            {/* Expertise Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-4"
            >
              {['AI/ML', 'Data Science', 'Full-Stack', 'Research'].map(
                (tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 text-sm font-medium bg-pro-darker border border-pro-tertiary text-pro-secondary rounded-full hover:border-pro-accent hover:text-pro-accent transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </motion.div>
          </div>

          {/* Right Column - Avatar Animation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-end"
          >
            <AvatarAnimation
              name={personalInfo.name}
              size={320}
              // imageUrl="/path-to-your-professional-photo.jpg" // Uncomment when you add your photo
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-pro-tertiary rounded-full flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-1 h-3 bg-pro-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
