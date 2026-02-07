import type { PersonalInfo } from '../types/cv.types';


export const generateCVFilename = (personalInfo: PersonalInfo): string => {
    const name = personalInfo.fullName || 'cv-maker';

    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        + '-cv';
};
