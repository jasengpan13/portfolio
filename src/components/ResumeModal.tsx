import React, { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { X, Printer, Copy, Check, ExternalLink, Download, FileText, Mail, MapPin } from 'lucide-react';

interface ResumeModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ data, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { profile, experiences, projects, skillCategories } = data;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlaintext = () => {
    const text = `
${profile.name} - ${profile.role}
Email: ${profile.email} | Location: ${profile.location}
GitHub: ${profile.githubUrl} | LinkedIn: ${profile.linkedinUrl}

SUMMARY:
${profile.bio}

WORK EXPERIENCE:
${experiences.map((exp) => `
${exp.role} — ${exp.company} (${exp.startDate} - ${exp.endDate})
Location: ${exp.location} ${exp.isRemote ? '(Remote)' : ''}
${exp.summary}
Key Accomplishments:
${exp.achievements.map((a) => `• ${a}`).join('\n')}
Technologies: ${exp.techStack.join(', ')}
`).join('\n')}

FEATURED PROJECTS:
${projects.map((p) => `
${p.title} (${p.category})
${p.tagline}
Key Metrics: ${p.keyMetrics.map((m) => `${m.label}: ${m.value}`).join(' | ')}
Technologies: ${p.techStack.join(', ')}
`).join('\n')}

SKILLS:
${skillCategories.map((c) => `${c.category}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white"
      onClick={onClose}
    >
      <div 
        id="resume-modal-content"
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-900/90 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-stone-100">Curriculum Vitae / Resume</span>
            <span className="text-xs text-stone-400 hidden sm:inline">• Print or Copy Format</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-xs transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              id="copy-plaintext-resume-btn"
              onClick={handleCopyPlaintext}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-stone-950 text-stone-100 font-sans print:bg-white print:text-stone-900 print:p-0">
          
          {/* Header */}
          <div className="border-b border-stone-800 print:border-stone-300 pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold text-stone-100 print:text-black tracking-tight">
              {profile.name}
            </h1>
            <p className="text-lg font-semibold text-emerald-400 print:text-stone-700">
              {profile.role}
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-stone-400 print:text-stone-600 pt-1">
              <span>{profile.location}</span>
              <span>•</span>
              <span>{profile.email}</span>
              {profile.githubUrl && (
                <>
                  <span>•</span>
                  <span>GitHub: {profile.githubUrl.replace('https://', '')}</span>
                </>
              )}
              {profile.linkedinUrl && (
                <>
                  <span>•</span>
                  <span>LinkedIn: {profile.linkedinUrl.replace('https://', '')}</span>
                </>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 print:text-stone-700 border-b border-stone-800 print:border-stone-300 pb-1">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 print:text-stone-800 leading-relaxed font-normal">
              {profile.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 print:text-stone-700 border-b border-stone-800 print:border-stone-300 pb-1">
              Professional Work Experience
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-sm font-bold text-stone-100 print:text-black">
                        {exp.role}
                      </span>
                      <span className="text-stone-400 print:text-stone-600 text-sm"> — {exp.company}</span>
                    </div>
                    <div className="text-xs text-stone-400 print:text-stone-600 font-medium">
                      {exp.startDate} – {exp.endDate} | {exp.location}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 print:text-stone-700 leading-relaxed italic">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1.5 pl-4 list-disc text-xs text-stone-300 print:text-stone-800">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {ach}
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-stone-400 print:text-stone-600 pt-1">
                    <span className="font-semibold text-stone-300 print:text-stone-700">Technologies: </span>
                    {exp.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects Highlight */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 print:text-stone-700 border-b border-stone-800 print:border-stone-300 pb-1">
              Key Engineering Projects & Architectures
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg bg-stone-900/60 print:bg-stone-50 border border-stone-800 print:border-stone-200 space-y-1">
                  <div className="text-xs font-bold text-stone-100 print:text-black">
                    {proj.title}
                  </div>
                  <div className="text-[11px] text-stone-400 print:text-stone-600">
                    {proj.tagline}
                  </div>
                  <div className="text-[10px] text-emerald-400 print:text-emerald-700 font-medium">
                    {proj.keyMetrics.map((m) => `${m.label}: ${m.value}`).join(' • ')}
                  </div>
                  <div className="text-[10px] text-stone-500 print:text-stone-600">
                    Stack: {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 print:text-stone-700 border-b border-stone-800 print:border-stone-300 pb-1">
              Technical Competencies
            </h2>
            <div className="space-y-2 text-xs text-stone-300 print:text-stone-800">
              {skillCategories.map((cat) => (
                <div key={cat.category} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-stone-200 print:text-black min-w-[200px]">
                    {cat.category}:
                  </span>
                  <span className="text-stone-400 print:text-stone-700">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 print:text-stone-700 border-b border-stone-800 print:border-stone-300 pb-1">
              Education & Certifications
            </h2>
            <div className="text-xs text-stone-300 print:text-stone-800 space-y-1">
              <div className="font-semibold text-stone-100 print:text-black">
                B.S. in Computer Science — University of California
              </div>
              <div className="text-stone-400 print:text-stone-600">
                AWS Certified Solutions Architect (Professional) • Certified Kubernetes Administrator (CKA)
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
