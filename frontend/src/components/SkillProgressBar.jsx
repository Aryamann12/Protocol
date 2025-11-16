import React, { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';

const SkillProgressBar = ({ name, level, years, color, delay = 0 }) => {
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const { ref, hasBeenInView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (hasBeenInView) {
      const timer = setTimeout(() => {
        setProgress(level);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [hasBeenInView, level, delay]);

  return (
    <div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Skill name and percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-200">{name}</span>
        <span className="text-sm font-semibold text-[#00d4ff]">{level}%</span>
      </div>

      {/* Progress bar container */}
      <div className="relative h-2.5 bg-[#1a1f3a] rounded-full overflow-hidden">
        {/* Background glow */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 blur-sm`}
          style={{
            width: `${progress}%`,
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Progress fill */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg`}
          style={{
            width: `${progress}%`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: showTooltip ? `0 0 20px rgba(0, 212, 255, 0.5)` : 'none'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-[#0f1329] border border-[#00d4ff]/30 rounded-lg px-3 py-2 shadow-xl">
            <p className="text-xs text-white whitespace-nowrap">
              {years} {years === 1 ? 'year' : 'years'} of experience
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0f1329] border-r border-b border-[#00d4ff]/30" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillProgressBar;
