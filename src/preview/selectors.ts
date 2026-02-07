import type { PersonalInfo, WorkExperience, SkillCategory, Education } from '../types/cv.types';
import { EXPORT_STRINGS } from '../data/constants';

/**
 * Formats personal info into a display-ready contact string
 */
export const getContactInfo = (info: PersonalInfo): string => {
    return [
        info.location,
        info.email,
        info.phone,
        info.linkedIn,
        info.github
    ].filter(Boolean).join(' | ');
};

/**
 * Safely retrieves experiences for export, ensuring non-null values
 */
export const getExperienceForExport = (experience: WorkExperience[]): WorkExperience[] => {
    return experience.map(exp => ({
        ...exp,
        company: exp.company || EXPORT_STRINGS.labels.na,
        position: exp.position || EXPORT_STRINGS.labels.na,
        responsibilities: exp.responsibilities.filter(Boolean)
    }));
};

/**
 * Safely filters and prepares skill categories for export
 */
export const getSkillsForExport = (skills: SkillCategory[]): SkillCategory[] => {
    return skills.filter(cat => cat.categoryName && cat.skills.length > 0 && cat.skills.some(s => s));
};

/**
 * Safely retrieves education for export
 */
export const getEducationForExport = (education: Education[]): Education[] => {
    return education.map(edu => ({
        ...edu,
        school: edu.school || EXPORT_STRINGS.labels.na,
        degree: edu.degree || EXPORT_STRINGS.labels.na
    }));
};

