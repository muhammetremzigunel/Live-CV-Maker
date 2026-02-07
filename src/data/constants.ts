import type { TemplateType, FormStep, CVTemplate } from '../types/cv.types';
import { PersonalInfoForm } from '../forms/PersonalInfoForm';
import { SummaryForm } from '../forms/SummaryForm';
import { ExperienceForm } from '../forms/ExperienceForm';
import { EducationForm } from '../forms/EducationForm';
import { SkillsForm } from '../forms/SkillsForm';
import { CertificationsForm } from '../forms/CertificationsForm';
import { ClassicATSTemplate } from '../preview/ClassicATSTemplate';

export const EXPORT_STRINGS = {
    sections: {
        professionalSummary: "PROFESSIONAL SUMMARY",
        professionalExperience: "PROFESSIONAL EXPERIENCE",
        education: "EDUCATION",
        technicalSkills: "TECHNICAL SKILLS",
        certifications: "CERTIFICATIONS"
    },
    labels: {
        present: "Present",
        na: "N/A"
    }
} as const;

export const FORM_STEPS: FormStep[] = [
    { id: 0, component: PersonalInfoForm },
    { id: 1, component: SummaryForm },
    { id: 2, component: ExperienceForm },
    { id: 3, component: EducationForm },
    { id: 4, component: SkillsForm },
    { id: 5, component: CertificationsForm }
];

export const MAX_STEP = FORM_STEPS.length - 1;

export const CV_TEMPLATES: CVTemplate[] = [
    { id: 'classic', component: ClassicATSTemplate }
];

export const DEFAULT_TEMPLATE = 'classic' as TemplateType;
