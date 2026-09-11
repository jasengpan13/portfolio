import React from 'react';
import { Profile } from '../types';
import { 
  MapPin, 
  Mail, 
  Github, 
  Linkedin, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  Briefcase,
  Layers,
  FileText,
  ExternalLink
} from 'lucide-react';

interface HeroSectionProps {
  profile: Profile;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenEditor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenResume,
  onOpenContact,
  onOpenEditor,
}) => {
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-stone-800/60 relative">
      {/* Subtle background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          {/* Main Hero Intro */}
          <div className="flex-1 space-y-6 max-w-3xl">
            {/* Status & Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-800 text-xs font-medium text-stone-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.statusText || 'Available for new engineering opportunities'}</span>
            </div>

            {/* Name and headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-100 tracking-tight leading-tight">
                Hi, I'm <span className="text-emerald-400">{profile.name}</span>.
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-stone-300 tracking-tight">
                {profile.role}
              </p>
              <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-2xl font-normal">
                {profile.tagline || profile.bio}
              </p>
            </div>

            {/* Location & Quick Contact metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
              <span className="text-stone-700 hidden sm:inline">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 hover:text-stone-200 transition-colors"
                id="hero-email-link"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.email}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-projects-btn"
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-sm transition-all shadow-sm"
              >
                <Layers className="w-4 h-4" />
                Explore Projects
              </button>

              <button
                id="hero-view-experience-btn"
                onClick={() => scrollToSection('#experience')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 hover:border-stone-700 font-medium text-sm transition-all"
              >
                <Briefcase className="w-4 h-4 text-stone-400" />
                Work History
              </button>

              <button
                id="hero-view-resume-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-300 border border-stone-800 font-medium text-sm transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                Resume
              </button>
            </div>

            {/* Social Links & Personalize Hint */}
            <div className="flex items-center gap-3 pt-3 border-t border-stone-900">
              <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
                    title="GitHub Profile"
                    id="hero-github-link"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
                    title="LinkedIn Profile"
                    id="hero-linkedin-link"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.websiteUrl && (
                  <a
                    href={profile.websiteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
                    title="Personal Website"
                    id="hero-website-link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="ml-auto hidden sm:block">
                <button
                  onClick={onOpenEditor}
                  className="text-xs text-stone-400 hover:text-emerald-400 transition-colors underline underline-offset-4"
                  id="hero-edit-profile-hint"
                >
                  Edit profile details
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics / Highlights Card */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="rounded-2xl bg-stone-900/70 border border-stone-800/80 p-5 sm:p-6 space-y-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Career Snapshot</span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-2xl font-bold text-stone-100">{profile.yearsOfExperience}+</div>
                  <div className="text-xs text-stone-400 mt-0.5">Years Experience</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-2xl font-bold text-stone-100">{profile.totalProjectsShipped}+</div>
                  <div className="text-xs text-stone-400 mt-0.5">Projects Shipped</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-2xl font-bold text-stone-100">{profile.openSourceContributions}+</div>
                  <div className="text-xs text-stone-400 mt-0.5">OSS Contributions</div>
                </div>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-xs text-stone-400 mt-0.5">Production Uptime</div>
                </div>
              </div>

              {/* Core Competencies Quick Tags */}
              <div className="space-y-2 pt-2 border-t border-stone-800">
                <div className="text-xs font-medium text-stone-400">Core Focus:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Distributed Systems', 'React & TypeScript', 'Real-time APIs', 'Cloud Architecture', 'AI & RAG'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-stone-800/80 text-stone-300 text-[11px] font-normal border border-stone-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
