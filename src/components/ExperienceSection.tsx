import React, { useState } from 'react';
import { WorkExperience } from '../types';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  Award
} from 'lucide-react';

interface ExperienceSectionProps {
  experiences: WorkExperience[];
  onOpenEditor: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onOpenEditor,
}) => {
  // Track expanded state for experiences with lots of bullets
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    // Expand the first two by default
    const initial: Record<string, boolean> = {};
    experiences.forEach((exp, idx) => {
      initial[exp.id] = idx < 2;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-20 border-b border-stone-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Career Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Recent Work Experience
            </h2>
            <p className="text-sm sm:text-base text-stone-400 mt-1 max-w-2xl">
              Track record of technical leadership, architectural decisions, and measurable business impact across fast-growing teams.
            </p>
          </div>

          <button
            id="add-experience-btn"
            onClick={onOpenEditor}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/40 text-stone-300 hover:text-emerald-300 text-xs font-medium transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            Add / Edit Experience
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-stone-800/80 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIds[exp.id] ?? false;

            return (
              <div 
                key={exp.id} 
                id={`experience-item-${exp.id}`}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  exp.isCurrent 
                    ? 'bg-emerald-500 border-emerald-400 text-stone-950 shadow-md shadow-emerald-500/20' 
                    : 'bg-stone-950 border-stone-700 text-stone-400 group-hover:border-stone-500'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${exp.isCurrent ? 'bg-stone-950' : 'bg-stone-400'}`} />
                </div>

                {/* Experience Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all duration-200 space-y-4">
                  
                  {/* Top Bar: Role & Company & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-bold text-stone-100">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-stone-300 mt-1 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="hover:text-emerald-400 hover:underline transition-colors flex items-center gap-1"
                          >
                            <span>{exp.company}</span>
                            <ExternalLink className="w-3 h-3 text-stone-500" />
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}
                        <span className="text-stone-600">•</span>
                        <div className="flex items-center gap-1 text-xs text-stone-400">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location} {exp.isRemote ? '(Remote)' : ''}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-400 self-start sm:self-auto bg-stone-950/70 px-3 py-1.5 rounded-lg border border-stone-800/60 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                  </div>

                  {/* Highlight Metric Banner (if present) */}
                  {exp.highlightMetric && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
                      <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Key Milestone: {exp.highlightMetric}</span>
                    </div>
                  )}

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                    {exp.summary}
                  </p>

                  {/* Key Achievements Bullet points */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                        Notable Accomplishments & Impact:
                      </div>
                      <ul className="space-y-2">
                        {(isExpanded ? exp.achievements : exp.achievements.slice(0, 2)).map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.achievements.length > 2 && (
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 pt-1"
                        >
                          {isExpanded ? (
                            <>
                              <span>Show fewer highlights</span>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Show {exp.achievements.length - 2} more achievements</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tech Stack used */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs text-stone-400 mr-1">Technologies:</span>
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[11px] font-medium border border-stone-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
