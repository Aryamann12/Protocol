import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../data/content';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(167, 139, 250, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <h2 className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">Projects</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00d4ff]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            What I've Created
          </h3>
          <p className="text-gray-400 text-lg">Showcasing key technical projects and innovations</p>
        </div>

        {/* Projects Grid - 2x2 Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#00d4ff]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00d4ff]/10 hover:-translate-y-2 relative"
            >
              {/* External Link Icon - Top Right */}
              <button className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0a0e27]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all opacity-0 group-hover:opacity-100">
                <ExternalLink className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#00d4ff]/10 to-[#a78bfa]/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3a] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <p className="text-xs text-[#00d4ff] mb-2 font-semibold">{project.dates}</p>

                {/* Title */}
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                  {project.title}
                </h4>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#00d4ff]/30 to-transparent mb-4" />

                {/* Enhanced Description with Bullet Points */}
                <div className="space-y-2 mb-4">
                  {project.detailedDescription ? (
                    project.detailedDescription.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-[#00d4ff] mt-1.5 flex-shrink-0">•</span>
                        <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 hover:border-[#00d4ff]/50 hover:text-[#00d4ff] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Link */}
                <button className="text-sm text-[#00d4ff] hover:text-white transition-colors flex items-center gap-1 group/btn font-semibold">
                  <span>View Project Details</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
