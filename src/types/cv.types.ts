export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  location: string;
  email: string;
  phone: string;
  linkedIn?: string;
  github?: string;
}

export interface ProfessionalSummary {
  text: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: ProfessionalSummary;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  certifications: Certification[];
}

export type TemplateType = 'classic';

export interface FormStep {
  id: number;
  component: React.ComponentType;
}

export interface CVTemplate {
  id: TemplateType;
  component: React.ComponentType;
}

