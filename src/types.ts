export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl?: string;
  statusText: string;
  isAvailableForHire: boolean;
  yearsOfExperience: number;
  totalProjectsShipped: number;
  openSourceContributions: number;
  avatarUrl?: string;
}

export type ProjectCategory = 'All' | 'Full Stack' | 'AI & ML' | 'Systems & Cloud' | 'Mobile & Web' | 'Open Source';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'AI & ML' | 'Systems & Cloud' | 'Mobile & Web' | 'Open Source';
  description: string;
  keyMetrics: ProjectMetric[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  problem: string;
  solution: string;
  architectureDetails: string[];
  impactSummary: string;
  previewTheme: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  achievements: string[];
  techStack: string[];
  highlightMetric?: string;
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  years?: number;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: WorkExperience[];
  skillCategories: SkillCategory[];
}
