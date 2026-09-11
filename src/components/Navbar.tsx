import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { 
  Briefcase, 
  Layers, 
  Cpu, 
  Mail, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  profile: Profile;
  onOpenResume: () => void;
  onOpenEditor: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResume,
  onOpenEditor,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects', icon: Layers },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'About', href: '#about', icon: Sparkles },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-stone-900/90 backdrop-blur-md border-b border-stone-800 shadow-md py-3'
          : 'bg-stone-950/60 backdrop-blur-sm border-b border-stone-900 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 focus:outline-none"
          id="navbar-brand-link"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm group-hover:border-emerald-400 group-hover:bg-emerald-500/20 transition-all">
            {profile.name.charAt(0) || 'P'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-stone-100 text-sm tracking-tight group-hover:text-emerald-400 transition-colors">
              {profile.name}
            </span>
            <span className="text-xs text-stone-400 font-normal truncate max-w-[160px] sm:max-w-xs">
              {profile.role}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-300">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1.5 rounded-md hover:text-stone-100 hover:bg-stone-800/60 transition-colors flex items-center gap-1.5 text-stone-300"
              >
                <Icon className="w-3.5 h-3.5 text-stone-400" />
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-700 bg-stone-800/60 hover:bg-stone-800 hover:border-stone-600 text-stone-200 text-xs font-medium transition-all"
            title="Preview Printable Resume"
          >
            <FileText className="w-3.5 h-3.5 text-stone-300" />
            Resume
          </button>

          <button
            id="nav-customize-btn"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 hover:border-emerald-500/40 bg-stone-900/80 hover:bg-emerald-950/30 text-stone-300 hover:text-emerald-300 text-xs font-medium transition-all"
            title="Customize your name, experience, & projects"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <button
            id="nav-contact-cta-btn"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold text-xs transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-stone-950" />
            Contact
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="nav-mobile-resume-btn"
            onClick={onOpenResume}
            className="p-1.5 text-stone-300 hover:text-white rounded-md border border-stone-800 bg-stone-900"
            title="Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 hover:bg-stone-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="sm:hidden border-t border-stone-800 bg-stone-950/95 px-4 pt-3 pb-5 space-y-2 mt-2 shadow-xl backdrop-blur-lg"
        >
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2 border-b border-stone-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-stone-200 hover:bg-stone-900 rounded-lg text-left"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>
          
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditor();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              Customize Portfolio Information
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-stone-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
