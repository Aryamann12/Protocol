import React from 'react';
import { FileText, BookOpen, Award } from 'lucide-react';
import { researchData } from '../data/content';
import { Button } from './ui/button';

const ResearchSection = () => {
  return (
    <section id="research" className="py-24 bg-[#0f1329] relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#a78bfa]" />
            <h2 className="text-[#a78bfa] text-sm uppercase tracking-wider font-semibold">Research</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Academic Contributions
          </h3>
        </div>

        {/* Research Papers */}
        <div className="space-y-6">
          {researchData.map((paper) => (
            <div
              key={paper.id}
              className="bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#a78bfa]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#a78bfa]/10"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="relative h-48 lg:h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#a78bfa]/10 to-[#00d4ff]/10">
                    <img
                      src={paper.image}
                      alt={paper.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#a78bfa]/10 border border-[#a78bfa]/30 rounded-full">
                      <FileText className="w-4 h-4 text-[#a78bfa]" />
                      <span className="text-xs font-semibold text-[#a78bfa] uppercase">Research Paper</span>
                    </div>
                    {paper.status === 'Accepted' && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                        <Award className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-semibold text-green-400 uppercase">Accepted</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-semibold text-white mb-3 leading-tight">
                    {paper.title}
                  </h4>

                  {/* Authors */}
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="text-gray-500">Authors:</span> {paper.authors}
                  </p>

                  {/* Venue */}
                  <p className="text-sm text-gray-400 mb-4">
                    <span className="text-gray-500">Venue:</span> {paper.venue}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-[#a78bfa]/30 to-transparent mb-4" />

                  {/* Abstract */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    <span className="text-[#a78bfa] font-semibold">Abstract:</span> {paper.abstract}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {paper.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#a78bfa]/5 border border-[#a78bfa]/20 rounded text-xs text-[#a78bfa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="bg-[#a78bfa] hover:bg-[#a78bfa]/90 text-white text-sm px-6"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Paper
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#a78bfa]/50 text-[#a78bfa] hover:bg-[#a78bfa]/10 text-sm px-6"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Citation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
