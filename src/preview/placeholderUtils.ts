import type { CVData, PersonalInfo, ProfessionalSummary } from '../types/cv.types';

export interface PlaceholderMetadata {
    personalInfo: Record<keyof PersonalInfo, boolean>;
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    certifications: boolean;
}

/**
 * Merges user data with mock data based on the enabled toggle.
 * Follows field-level fallback logic for objects and list-level fallback for arrays.
 */
export const mergeWithPlaceholders = (
    userData: CVData,
    mockData: CVData,
    enabled: boolean
): { data: CVData; metadata: PlaceholderMetadata } => {
    const defaultMetadata: PlaceholderMetadata = {
        personalInfo: Object.keys(mockData.personalInfo).reduce((acc, key) => ({
            ...acc,
            [key]: false
        }), {} as any),
        summary: false,
        experience: false,
        education: false,
        skills: false,
        certifications: false
    };

    if (!enabled) {
        return { data: userData, metadata: defaultMetadata };
    }

    const metadata: PlaceholderMetadata = {
        personalInfo: {
            fullName: !userData.personalInfo.fullName,
            professionalTitle: !userData.personalInfo.professionalTitle,
            location: !userData.personalInfo.location,
            email: !userData.personalInfo.email,
            phone: !userData.personalInfo.phone,
            linkedIn: !userData.personalInfo.linkedIn,
            github: !userData.personalInfo.github
        },
        summary: !userData.summary.text,
        experience: userData.experience.length === 0,
        education: userData.education.length === 0,
        skills: userData.skills.length === 0,
        certifications: userData.certifications.length === 0
    };

    return {
        data: {
            personalInfo: mergePersonalInfo(userData.personalInfo, mockData.personalInfo),
            summary: mergeSummary(userData.summary, mockData.summary),
            experience: userData.experience.length > 0 ? userData.experience : mockData.experience,
            education: userData.education.length > 0 ? userData.education.map((edu: any) => ({ ...edu, id: edu.id || Math.random().toString() })) : mockData.education,
            skills: userData.skills.length > 0 ? userData.skills.map((cat: any) => ({ ...cat, id: cat.id || Math.random().toString() })) : mockData.skills,
            certifications: userData.certifications.length > 0 ? userData.certifications.map((cert: any) => ({ ...cert, id: cert.id || Math.random().toString() })) : mockData.certifications,
        },
        metadata
    };
};

const mergePersonalInfo = (user: PersonalInfo, mock: PersonalInfo): PersonalInfo => {
    return {
        fullName: user.fullName || mock.fullName,
        professionalTitle: user.professionalTitle || mock.professionalTitle,
        location: user.location || mock.location,
        email: user.email || mock.email,
        phone: user.phone || mock.phone,
        linkedIn: user.linkedIn || mock.linkedIn,
        github: user.github || mock.github,
    };
};

const mergeSummary = (user: ProfessionalSummary, mock: ProfessionalSummary): ProfessionalSummary => {
    return {
        text: user.text || mock.text,
    };
};
