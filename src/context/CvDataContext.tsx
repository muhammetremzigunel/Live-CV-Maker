import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
    CVData,
    PersonalInfo,
    ProfessionalSummary,
    WorkExperience,
    Education,
    SkillCategory,
    Certification
} from '../types/cv.types';

interface CvDataContextType {
    cvData: CVData;
    updatePersonalInfo: (info: PersonalInfo) => void;
    updateSummary: (summary: ProfessionalSummary) => void;
    updateExperience: (experience: WorkExperience[]) => void;
    updateEducation: (education: Education[]) => void;
    updateSkills: (skills: SkillCategory[]) => void;
    updateCertifications: (certifications: Certification[]) => void;
    setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const defaultPersonalInfo: PersonalInfo = {
    fullName: '',
    professionalTitle: '',
    location: '',
    email: '',
    phone: '',
    linkedIn: '',
    github: ''
};

const defaultCVData: CVData = {
    personalInfo: defaultPersonalInfo,
    summary: { text: '' },
    experience: [],
    education: [],
    skills: [],
    certifications: []
};

const CvDataContext = createContext<CvDataContextType | undefined>(undefined);

export const CvDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cvData, setCVData] = useState<CVData>(defaultCVData);

    const updatePersonalInfo = useCallback((info: PersonalInfo) => {
        setCVData(prev => ({ ...prev, personalInfo: info }));
    }, []);

    const updateSummary = useCallback((summary: ProfessionalSummary) => {
        setCVData(prev => ({ ...prev, summary }));
    }, []);

    const updateExperience = useCallback((experience: WorkExperience[]) => {
        setCVData(prev => ({ ...prev, experience }));
    }, []);

    const updateEducation = useCallback((education: Education[]) => {
        setCVData(prev => ({ ...prev, education }));
    }, []);

    const updateSkills = useCallback((skills: SkillCategory[]) => {
        setCVData(prev => ({ ...prev, skills }));
    }, []);

    const updateCertifications = useCallback((certifications: Certification[]) => {
        setCVData(prev => ({ ...prev, certifications }));
    }, []);

    const value = useMemo(() => ({
        cvData,
        updatePersonalInfo,
        updateSummary,
        updateExperience,
        updateEducation,
        updateSkills,
        updateCertifications,
        setCVData
    }), [cvData, updatePersonalInfo, updateSummary, updateExperience, updateEducation, updateSkills, updateCertifications]);

    return (
        <CvDataContext.Provider value={value}>
            {children}
        </CvDataContext.Provider>
    );
};

export const useCvData = () => {
    const context = useContext(CvDataContext);
    if (!context) {
        throw new Error('useCvData must be used within CvDataProvider');
    }
    return context;
};
