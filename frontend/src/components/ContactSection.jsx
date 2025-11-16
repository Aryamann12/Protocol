import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Check, MapPin, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { personalInfo } from '../data/content';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.message.length < 10) {
      toast({
        title: "Message too short",
        description: "Please write at least 10 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0e27] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a78bfa]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <h2 className="text-[#00d4ff] text-sm uppercase tracking-wider font-semibold">Contact</h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00d4ff]" />
          </div>
          <h3 className="text-4xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Let's Build Something Cool
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to collaboration, interesting projects, or just a chat about AI, code, or music.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="bg-[#1a1f3a]/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 mb-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info Cards */}
            <div className="space-y-6">
              {/* Personal Email Card */}
              <div className="bg-[#0f1329]/50 border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Personal Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-[#00d4ff] hover:text-white transition-colors text-lg font-medium"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Email Card */}
              <div className="bg-[#0f1329]/50 border border-[#00d4ff]/20 rounded-xl p-6 hover:border-[#00d4ff]/40 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#00d4ff] flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Professional Email</p>
                    <a
                      href={`mailto:${personalInfo.workEmail}`}
                      className="text-[#00d4ff] hover:text-white transition-colors text-lg font-medium"
                    >
                      {personalInfo.workEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Connect With Me Section */}
              <div className="bg-[#0f1329]/50 border border-[#a78bfa]/20 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span className="text-[#a78bfa]">•</span>
                  Connect With Me
                </h4>
                <div className="flex items-center gap-4">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white transition-all hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white transition-all hover:scale-110"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Send a Message</h4>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-[#0f1329] border-white/10 text-white placeholder:text-gray-500 focus:border-[#00d4ff] focus:ring-[#00d4ff]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-[#0f1329] border-white/10 text-white placeholder:text-gray-500 focus:border-[#00d4ff] focus:ring-[#00d4ff]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    className="bg-[#0f1329] border-white/10 text-white placeholder:text-gray-500 focus:border-[#00d4ff] focus:ring-[#00d4ff] resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full bg-gradient-to-r from-[#00d4ff] to-[#a78bfa] hover:opacity-90 text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-[#00d4ff]/50 transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
