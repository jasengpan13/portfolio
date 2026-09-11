import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Cpu, Check, Layers, Sparkles, Terminal, Cloud } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Advanced':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-700';
    }
  };

  return (
    <section id="skills" className="py-20 border-b border-stone-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Skills & Core Capabilities
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-1 max-w-2xl">
            A comprehensive matrix of languages, frameworks, cloud primitives, and architectural methodologies honed over 7+ years of production experience.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all duration-200 space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-100">
                    {cat.category}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {cat.skills.length} competencies
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/60 flex items-center justify-between gap-2 hover:border-stone-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-xs font-medium text-stone-200 truncate">
                        {skill.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {skill.years && (
                        <span className="text-[10px] text-stone-500 font-normal">
                          {skill.years}y
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getLevelBadgeColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Principles Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-stone-950/70 border border-stone-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <div className="text-sm font-bold text-stone-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Performance by Default
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Sub-100ms response targets, zero unnecessary client-side re-renders, and aggressive optimization of critical rendering paths.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-stone-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Resilient Architecture
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Stateless API gateways, atomic transactions, self-healing queues, and end-to-end telemetry monitoring.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-stone-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Craftsmanship & Clarity
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              Strict type safety, self-documenting codebases, high test coverage, and human-centric engineering leadership.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
