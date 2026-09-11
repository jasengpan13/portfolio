import React, { useState } from 'react';
import { PortfolioData, Project, WorkExperience } from '../types';
import { 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  User, 
  Layers, 
  Briefcase, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface PortfolioEditorModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: PortfolioData) => void;
  onReset: () => void;
}

export const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [savedNotice, setSavedNotice] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);

  // Sync when reopened or data changes
  React.useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleProfileChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  const handleAddNewProject = () => {
    const newProject: Project = {
      id: 'proj-' + Date.now(),
      title: 'New High-Impact Project',
      tagline: 'Brief description of architecture and functionality',
      category: 'Full Stack',
      description: 'Detailed description of the application architecture, system design, and implementation.',
      keyMetrics: [
        { label: 'Throughput', value: '10k req/sec' },
        { label: 'Latency', value: '45ms' },
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project',
      featured: false,
      problem: 'What specific technical or business problem needed solving?',
      solution: 'How did your technical architecture resolve this problem?',
      architectureDetails: [
        'Modular distributed services',
        'Automated CI/CD pipeline',
      ],
      impactSummary: 'Quantifiable outcome achieved for the business or users.',
      previewTheme: 'from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-600',
    };

    setFormData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    setEditingProjectId(newProject.id);
  };

  const handleDeleteProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    if (editingProjectId === id) setEditingProjectId(null);
  };

  const handleAddNewExperience = () => {
    const newExp: WorkExperience = {
      id: 'exp-' + Date.now(),
      role: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      companyUrl: 'https://example.com',
      location: 'Remote',
      isRemote: true,
      startDate: 'Jan 2024',
      endDate: 'Present',
      isCurrent: true,
      summary: 'Summary of leadership responsibilities, team scale, and system ownership.',
      achievements: [
        'Architected core services handling high traffic volume.',
        'Mentored junior engineers and improved team test coverage to 90%.',
      ],
      techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
      highlightMetric: '40% velocity improvement',
    };

    setFormData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
    setEditingExpId(newExp.id);
  };

  const handleDeleteExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
    if (editingExpId === id) setEditingExpId(null);
  };

  return (
    <div 
      id="editor-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="editor-modal-container"
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-900/90">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <span>Personalize Portfolio Showcase</span>
            </h2>
            <p className="text-xs text-stone-400">
              Customize your profile details, featured projects, and work history. All edits save locally.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="editor-reset-defaults-btn"
              onClick={() => {
                if (window.confirm('Reset all details back to the default example profile?')) {
                  onReset();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-rose-950/30 text-stone-400 hover:text-rose-300 text-xs font-medium border border-stone-700/60 transition-colors flex items-center gap-1.5"
              title="Reset to default example data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Example</span>
            </button>

            <button
              id="close-editor-modal-btn"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-stone-950/70 border-b border-stone-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'profile'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Profile & Bio
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'projects'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Projects ({formData.projects.length})
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'experience'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Work History ({formData.experiences.length})
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Your Full Name</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Professional Title / Role</label>
                  <input
                    type="text"
                    value={formData.profile.role}
                    onChange={(e) => handleProfileChange('role', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Email Address</label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Location</label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={formData.profile.githubUrl}
                    onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={formData.profile.linkedinUrl}
                    onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Tagline / Hero Hook</label>
                <input
                  type="text"
                  value={formData.profile.tagline}
                  onChange={(e) => handleProfileChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Professional Bio / Summary</label>
                <textarea
                  rows={4}
                  value={formData.profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200 resize-y"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Years Experience</label>
                  <input
                    type="number"
                    value={formData.profile.yearsOfExperience}
                    onChange={(e) => handleProfileChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Projects Shipped</label>
                  <input
                    type="number"
                    value={formData.profile.totalProjectsShipped}
                    onChange={(e) => handleProfileChange('totalProjectsShipped', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-300">Status Headline</label>
                  <input
                    type="text"
                    value={formData.profile.statusText}
                    onChange={(e) => handleProfileChange('statusText', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  Manage your portfolio projects. Select any to edit details or add a new one.
                </span>
                <button
                  onClick={handleAddNewProject}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Project
                </button>
              </div>

              <div className="space-y-3">
                {formData.projects.map((proj) => {
                  const isEditing = editingProjectId === proj.id;
                  return (
                    <div
                      key={proj.id}
                      className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-stone-200">{proj.title}</span>
                          <span className="ml-2 text-xs text-emerald-400 font-mono">[{proj.category}]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProjectId(isEditing ? null : proj.id)}
                            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                          >
                            {isEditing ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 pt-3 border-t border-stone-800">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => {
                                  const updated = formData.projects.map((p) =>
                                    p.id === proj.id ? { ...p, title: e.target.value } : p
                                  );
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Category</label>
                              <select
                                value={proj.category}
                                onChange={(e) => {
                                  const updated = formData.projects.map((p) =>
                                    p.id === proj.id ? { ...p, category: e.target.value as any } : p
                                  );
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              >
                                <option value="Full Stack">Full Stack</option>
                                <option value="Systems & Cloud">Systems & Cloud</option>
                                <option value="AI & ML">AI & ML</option>
                                <option value="Open Source">Open Source</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Tagline</label>
                            <input
                              type="text"
                              value={proj.tagline}
                              onChange={(e) => {
                                const updated = formData.projects.map((p) =>
                                  p.id === proj.id ? { ...p, tagline: e.target.value } : p
                                );
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Overview Description</label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => {
                                const updated = formData.projects.map((p) =>
                                  p.id === proj.id ? { ...p, description: e.target.value } : p
                                );
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Tech Stack (comma separated)</label>
                            <input
                              type="text"
                              value={proj.techStack.join(', ')}
                              onChange={(e) => {
                                const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                const updated = formData.projects.map((p) =>
                                  p.id === proj.id ? { ...p, techStack: list } : p
                                );
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Live URL</label>
                              <input
                                type="text"
                                value={proj.liveUrl || ''}
                                onChange={(e) => {
                                  const updated = formData.projects.map((p) =>
                                    p.id === proj.id ? { ...p, liveUrl: e.target.value } : p
                                  );
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">GitHub URL</label>
                              <input
                                type="text"
                                value={proj.githubUrl || ''}
                                onChange={(e) => {
                                  const updated = formData.projects.map((p) =>
                                    p.id === proj.id ? { ...p, githubUrl: e.target.value } : p
                                  );
                                  setFormData({ ...formData, projects: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400">
                  Update your chronological work history, roles, and accomplishments.
                </span>
                <button
                  onClick={handleAddNewExperience}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Position
                </button>
              </div>

              <div className="space-y-3">
                {formData.experiences.map((exp) => {
                  const isEditing = editingExpId === exp.id;
                  return (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-sm text-stone-200">{exp.role}</span>
                          <span className="ml-2 text-xs text-stone-400">at {exp.company}</span>
                          <span className="ml-2 text-[11px] text-emerald-400 font-mono">({exp.startDate} - {exp.endDate})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingExpId(isEditing ? null : exp.id)}
                            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                          >
                            {isEditing ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                            title="Delete role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="space-y-3 pt-3 border-t border-stone-800">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Job Title / Role</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = formData.experiences.map((item) =>
                                    item.id === exp.id ? { ...item, role: e.target.value } : item
                                  );
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Company Name</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = formData.experiences.map((item) =>
                                    item.id === exp.id ? { ...item, company: e.target.value } : item
                                  );
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">Start Date</label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const updated = formData.experiences.map((item) =>
                                    item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                  );
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-stone-400">End Date (or 'Present')</label>
                              <input
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => {
                                  const updated = formData.experiences.map((item) =>
                                    item.id === exp.id ? { ...item, endDate: e.target.value } : item
                                  );
                                  setFormData({ ...formData, experiences: updated });
                                }}
                                className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Role Summary</label>
                            <textarea
                              rows={2}
                              value={exp.summary}
                              onChange={(e) => {
                                const updated = formData.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, summary: e.target.value } : item
                                );
                                setFormData({ ...formData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Accomplishments (one per line)</label>
                            <textarea
                              rows={3}
                              value={exp.achievements.join('\n')}
                              onChange={(e) => {
                                const bullets = e.target.value.split('\n').filter(Boolean);
                                const updated = formData.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, achievements: bullets } : item
                                );
                                setFormData({ ...formData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-stone-400">Tech Stack (comma separated)</label>
                            <input
                              type="text"
                              value={exp.techStack.join(', ')}
                              onChange={(e) => {
                                const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                const updated = formData.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, techStack: list } : item
                                );
                                setFormData({ ...formData, experiences: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-900 border border-stone-800 text-xs text-stone-200"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/90 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {savedNotice ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Changes saved successfully!
              </span>
            ) : (
              'Changes will be saved to your browser storage.'
            )}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-portfolio-changes-btn"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Save Portfolio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
