import React from 'react';
import { Music, Guitar, Mic2 } from 'lucide-react';

const MusicSection = () => {
  return (
    <section id="music" className="py-24 bg-[#0f1329] relative overflow-hidden">
      {/* Dark Moody Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#a78bfa]" />
            <h2 className="text-[#a78bfa] text-sm uppercase tracking-wider font-semibold">Beyond the Code</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Music & Creativity
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not building ML models or analyzing data, you'll find me:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-lg hover:border-[#00d4ff]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] flex items-center justify-center flex-shrink-0">
                  <Guitar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1">Playing Guitar</h5>
                  <p className="text-gray-400 text-sm">Performing as a guitarist in college bands and informal gigs, blending rhythm with creativity.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-lg hover:border-[#00d4ff]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#00d4ff] flex items-center justify-center flex-shrink-0">
                  <Mic2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1">Main Vocalist</h5>
                  <p className="text-gray-400 text-sm">Leading vocals in performances, bringing energy and emotion to every song.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-[#00d4ff]/5 to-[#a78bfa]/5 border border-[#00d4ff]/20 rounded-xl">
              <p className="text-gray-300 italic leading-relaxed">
                "I believe creativity flows through both algorithms and melodies. Music taught me timing, collaboration, and the art of improvisation — skills that translate seamlessly into problem-solving and innovation in tech."
              </p>
            </div>
          </div>

          {/* Right: Music Player-Style Card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1329] border border-[#00d4ff]/30 rounded-2xl p-8 shadow-2xl shadow-[#00d4ff]/20">
              {/* Music Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-[#00d4ff]/50 animate-pulse">
                  <Music className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Now Playing Text */}
              <div className="text-center mb-6">
                <p className="text-[#00d4ff] text-sm font-semibold mb-2">♪ Performing Live</p>
                <h4 className="text-white text-xl font-semibold mb-1">Guitarist & Vocalist</h4>
                <p className="text-gray-400 text-sm">College Bands & Gigs</p>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-end justify-center gap-1 h-20 mb-6">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#00d4ff] to-[#a78bfa] rounded-full"
                    style={{
                      height: '40%',
                      animation: `wave 1s ease-in-out infinite`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}
              </div>

              {/* Placeholder Controls */}
              <div className="flex items-center justify-center gap-6 text-gray-400">
                <button className="hover:text-white transition-colors">⏮</button>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  <span className="text-white text-xl">▶</span>
                </button>
                <button className="hover:text-white transition-colors">⏭</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for waveform animation */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 20%;
          }
          50% {
            height: 80%;
          }
        }
      `}</style>
    </section>
  );
};

export default MusicSection;
