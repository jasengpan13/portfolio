import React from 'react';
import { Profile } from '../types';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  profile: Profile;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenResume, onOpenEditor }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-800 bg-stone-950 py-12 text-stone-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand and copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                {profile.name.charAt(0) || 'P'}
              </div>
              <span className="font-bold text-stone-200 text-sm">{profile.name}</span>
            </div>
            <p className="text-stone-500 text-xs">
              {profile.role} • Designed with craft and high performance
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-400">
            <a href="#projects" className="hover:text-stone-200 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-stone-200 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-stone-200 transition-colors">Skills</a>
            <a href="#about" className="hover:text-stone-200 transition-colors">About</a>
            <button onClick={onOpenResume} className="hover:text-stone-200 transition-colors">Resume</button>
            <button onClick={onOpenEditor} className="text-emerald-400 hover:text-emerald-300 transition-colors">Customize</button>
          </div>

          {/* Back to top and socials */}
          <div className="flex items-center gap-3">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 transition-colors"
              title="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-medium transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
