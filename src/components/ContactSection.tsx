import React, { useState } from 'react';
import { Profile } from '../types';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Github, 
  Linkedin,
  CheckCircle2
} from 'lucide-react';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <Mail className="w-3.5 h-3.5" />
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-1 max-w-2xl">
            Whether you are discussing a senior engineering role, cloud architecture consultation, or technical leadership, I'm always open to connecting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left: Contact Info & Timezone Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-5">
              <h3 className="text-base font-bold text-stone-100">
                Direct Contact Channels
              </h3>

              {/* Email Copy Card */}
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/70 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Direct Email
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-stone-200 truncate mt-0.5">
                    {profile.email}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    id="copy-email-address-btn"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-stone-100 transition-colors"
                    title="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 transition-colors font-medium text-xs"
                    title="Open Mail Client"
                    id="open-mail-client-btn"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Location & Timezone info */}
              <div className="space-y-3 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">Location:</span> {profile.location}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">Response Speed:</span> Typically within 24 business hours
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 hover:text-stone-100 hover:border-stone-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 hover:text-stone-100 hover:border-stone-700 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-emerald-300">Currently considering:</span> Lead / Senior Full Stack roles, distributed systems challenges, and high-impact advisory contracts.
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/60 border border-stone-800/80">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-100">Message Received!</h3>
                  <p className="text-sm text-stone-400 max-w-md mx-auto">
                    Thank you for reaching out. A confirmation has been registered and I will reply to your email at <span className="text-emerald-400 font-medium">{profile.email}</span> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-stone-300">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-stone-300">
                        Your Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-stone-300">
                      Subject / Topic
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Engineering Role Discussion / Technical Advisory"
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-stone-300">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi, I saw your portfolio projects and wanted to discuss an opportunity..."
                      className="w-full px-3.5 py-2 rounded-xl bg-stone-950/70 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 resize-y"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-rose-400 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-stone-950" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
