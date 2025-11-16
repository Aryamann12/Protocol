import React from 'react';
import { Github, Linkedin, Mail, FileText, ArrowUp, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/content';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#0f1329] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left - Name & Tagline */}
          <div>
            <h3 
              className="text-2xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              {personalInfo.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building intelligent systems with AI, data science, and a touch of creativity.
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-[#00d4ff]">•</span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'My Journey', id: 'journey' },
                { label: 'Experience', id: 'experience' },
                { label: 'Projects', id: 'projects' },
                { label: 'Research', id: 'research' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-[#00d4ff] transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Follow & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="text-[#a78bfa]">•</span>
              Follow
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1a1f3a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1a1f3a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 rounded-lg bg-[#1a1f3a] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Feel free to reach out for collaborations or just to say hi!
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-[#00d4ff] transition-colors text-sm">
                Privacy
              </button>
              <button className="text-gray-400 hover:text-[#00d4ff] transition-colors text-sm">
                Terms
              </button>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1f3a] border border-white/10 text-gray-400 hover:text-white hover:border-[#00d4ff] transition-all hover:shadow-lg hover:shadow-[#00d4ff]/20"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm">Back to top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
