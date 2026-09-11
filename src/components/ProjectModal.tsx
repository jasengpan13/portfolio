import React, { useEffect } from 'react';
import { Project } from '../types';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle, 
  Layers, 
  AlertCircle, 
  Zap, 
  TrendingUp, 
  Code2 
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="project-modal-container"
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-800 bg-stone-900/90 sticky top-0 z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured Case Study
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-100">{project.title}</h2>
            <p className="text-xs sm:text-sm text-stone-400">{project.tagline}</p>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics Banner */}
          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
              {project.keyMetrics.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-emerald-400">{metric.value}</div>
                  <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Project Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Project Overview
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/70 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                The Problem
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/70 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" />
                The Solution
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architectural Details */}
          {project.architectureDetails && project.architectureDetails.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Key Architectural Highlights
              </h3>
              <ul className="space-y-2">
                {project.architectureDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Measurable Business Impact */}
          {project.impactSummary && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                Measurable Impact & Results
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                {project.impactSummary}
              </p>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-stone-400" />
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium border border-stone-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-xs transition-colors"
                id="modal-live-demo-link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Application
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs border border-stone-700 transition-colors"
                id="modal-github-link"
              >
                <Github className="w-3.5 h-3.5" />
                Source Code
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
