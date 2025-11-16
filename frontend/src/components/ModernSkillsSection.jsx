import React from 'react';
import { skillsProgressData } from '../data/skillsProgress';
import SkillProgressBar from './SkillProgressBar';
import useInView from '../hooks/useInView';

const ModernSkillsSection = () => {
  const { ref: headerRef, hasBeenInView: headerInView } = useInView({ threshold: 0.3 });
  
  const categories = Object.entries(skillsProgressData);
  const mainCategories = categories.filter(([key]) => key !== 'softSkills');
  const softSkillsCategory = categories.find(([key]) => key === 'softSkills');

  return (
    <section id="skills" className="py-24 bg-[#0a0e27] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#a78bfa]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00d4ff]/5 to-[#a78bfa]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent animate-pulse" />
            <h2 className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">Technical Arsenal</h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-[#00d4ff] to-transparent animate-pulse" />
          </div>
          <h3 
            className="text-5xl md:text-6xl font-light mb-4"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Skills & Expertise
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Years of hands-on experience building production-grade systems
          </p>
        </div>

        {/* Main Skills Categories - 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {mainCategories.map(([key, category], categoryIndex) => {
            const CategoryInView = () => {
              const { ref, hasBeenInView } = useInView({ threshold: 0.1 });
              
              return (
                <div
                  ref={ref}
                  className={`bg-[#1a1f3a]/30 backdrop-blur-sm border-2 border-[#00d4ff]/10 rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d4ff]/10 group ${
                    hasBeenInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${categoryIndex * 100}ms`
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#00d4ff]/10">
                    <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r"
                        style={{ 
                          backgroundImage: (() => {
                            if (!category.color) {
                              return 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 100%)';
                            }
                            const colorParts = category.color.split(' ');
                            const fromColor = colorParts[0]?.replace('from-', '') || 'blue-500';
                            const toColor = colorParts[2]?.replace('to-', '') || 'purple-600';
                            
                            // Map Tailwind colors to hex values
                            const colorMap = {
                              'blue-500': '#3b82f6',
                              'purple-600': '#9333ea',
                              'green-500': '#22c55e',
                              'teal-600': '#0d9488',
                              'orange-500': '#f97316',
                              'red-600': '#dc2626',
                              'pink-500': '#ec4899',
                              'cyan-500': '#06b6d4'
                            };
                            
                            const fromHex = colorMap[fromColor] || '#3b82f6';
                            const toHex = colorMap[toColor] || '#9333ea';
                            
                            return `linear-gradient(135deg, ${fromHex} 0%, ${toHex} 100%)`;
                          })()
                        }}
                      >
                        {category.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Skills Progress Bars */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillProgressBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        years={skill.years}
                        color={category.color}
                        delay={hasBeenInView ? skillIndex * 50 : 0}
                      />
                    ))}
                  </div>
                </div>
              );
            };
            
            return <CategoryInView key={key} />;
          })}
        </div>

        {/* Soft Skills - Full Width */}
        {softSkillsCategory && (() => {
          const [key, category] = softSkillsCategory;
          const SoftSkillsInView = () => {
            const { ref, hasBeenInView } = useInView({ threshold: 0.1 });
            
            return (
              <div
                ref={ref}
                className={`bg-gradient-to-br from-[#1a1f3a]/40 to-[#0f1329]/40 backdrop-blur-sm border-2 border-[#a78bfa]/10 rounded-2xl p-8 hover:border-[#a78bfa]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#a78bfa]/10 group ${
                  hasBeenInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#a78bfa]/10">
                  <div className="text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#00d4ff]">
                      {category.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Essential interpersonal and leadership abilities
                    </p>
                  </div>
                </div>

                {/* Skills Progress Bars - Two Columns */}
                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillProgressBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      years={skill.years}
                      color={category.color}
                      delay={hasBeenInView ? skillIndex * 50 : 0}
                    />
                  ))}
                </div>
              </div>
            );
          };
          
          return <SoftSkillsInView key={key} />;
        })()}
      </div>

      {/* Add shimmer animation to CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default ModernSkillsSection;
