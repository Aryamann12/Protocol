import React from 'react';
import { GraduationCap, Briefcase, Microscope, Rocket, Brain, MapPin } from 'lucide-react';
import { journeyData } from '../data/content';

const iconMap = {
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'microscope': Microscope,
  'rocket': Rocket,
  'brain': Brain
};

const JourneySection = () => {
  return (
    <section id="journey" className="py-24 bg-[#0a0e27] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <h2 className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">Journey</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00d4ff]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            The Story So Far
          </h3>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#a78bfa] to-[#00d4ff]" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {journeyData.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        item.current
                          ? 'bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] shadow-lg shadow-[#00d4ff]/50'
                          : 'bg-[#1a1f3a] border-2 border-[#00d4ff]'
                      }`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-28 md:ml-0 md:w-5/12 ${
                      isEven ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                    }`}
                  >
                    <div
                      className={`group bg-[#1a1f3a]/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#00d4ff]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00d4ff]/10 hover:-translate-y-2 ${
                        item.current ? 'ring-2 ring-[#00d4ff]/50' : ''
                      }`}
                    >
                      {/* Badge */}
                      <div className="inline-block px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-xs font-semibold mb-3">
                        {item.year}
                      </div>

                      {/* Title */}
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                        {item.title}
                      </h4>

                      {/* Location and Dates */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-400">{item.location}</span>
                        <MapPin className="w-4 h-4 text-[#00d4ff]" />
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{item.dates}</span>
                      </div>

                      {/* Image */}
                      {item.image && (
                        <div className="mb-4 flex justify-center">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-32 h-32 object-contain bg-white/5 rounded-full p-3 border border-white/10"
                          />
                        </div>
                      )}

                      {/* Description as Bullet Points */}
                      <ul className="text-gray-300 text-sm leading-relaxed mb-4 space-y-2">
                        {item.description.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            <span className="text-[#00d4ff] mt-1.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Current Badge */}
                      {item.current && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#00d4ff] to-[#a78bfa] rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-white">Current Role</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
