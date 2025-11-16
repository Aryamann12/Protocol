import React from 'react';
import { ExternalLink } from 'lucide-react';
import { experienceData } from '../data/content';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-[#0f1329] relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#a78bfa]" />
            <h2 className="text-[#a78bfa] text-sm uppercase tracking-wider font-semibold">Experience</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Where I've Built & Learned
          </h3>
        </div>

        {/* Experience Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="group bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#00d4ff]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00d4ff]/10 hover:-translate-y-2"
            >
              {/* Company Logo Area - Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">{exp.company.charAt(0)}</span>
              </div>

              {/* Position */}
              <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-[#00d4ff] transition-colors">
                {exp.position}
              </h4>

              {/* Company & Duration */}
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <span>{exp.company}</span>
                <span>•</span>
                <span>{exp.duration}</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[#00d4ff]/50 to-transparent mb-4" />

              {/* Highlights */}
              <ul className="space-y-2 mb-4">
                {exp.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#00d4ff]/5 border border-[#00d4ff]/20 rounded text-xs text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Current Badge */}
              {exp.current && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#00d4ff] to-[#a78bfa] rounded-full shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-white">Current Position</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
