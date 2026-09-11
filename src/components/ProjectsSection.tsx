import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { 
  Layers, 
  ExternalLink, 
  Github, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Plus,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenEditor: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onOpenEditor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Full Stack',
    'Systems & Cloud',
    'AI & ML',
    'Open Source',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 border-b border-stone-800/60 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              Featured Engineering Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
              Featured Projects & Systems
            </h2>
            <p className="text-sm sm:text-base text-stone-400 mt-1 max-w-2xl">
              Architectural deep-dives, production web systems, and high-impact software solutions with verifiable metrics.
            </p>
          </div>

          <button
            id="add-project-btn"
            onClick={onOpenEditor}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-emerald-500/40 text-stone-300 hover:text-emerald-300 text-xs font-medium transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            Add / Edit Projects
          </button>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-stone-800/80">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Keyword Search Input */}
          <div className="relative min-w-[220px] sm:w-64">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="projects-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-stone-900/40 border border-stone-800/80 space-y-3">
            <p className="text-stone-300 font-medium text-sm">No projects found matching your criteria.</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group flex flex-col justify-between rounded-2xl bg-stone-900/60 hover:bg-stone-900/90 border border-stone-800/80 hover:border-stone-700 transition-all duration-200 p-5 sm:p-6 shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-stone-100 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1 line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Impact Metrics Banner */}
                  {project.keyMetrics && project.keyMetrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/60">
                      {project.keyMetrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-sm sm:text-base font-bold text-emerald-400">{m.value}</div>
                          <div className="text-[10px] text-stone-400 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-stone-800/90 text-stone-300 text-[11px] font-medium border border-stone-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-stone-800/40 text-stone-400 text-[11px]">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-5 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    id={`view-case-study-${project.id}`}
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-0.5 transition-all"
                  >
                    View Case Study
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                        title="Open Live Application"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
