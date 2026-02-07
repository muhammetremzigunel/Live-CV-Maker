import type { CVData } from '../types/cv.types';
import { formatDateRange, formatDate } from '../utils/dateFormatter';
import { getContactInfo, getExperienceForExport, getEducationForExport, getSkillsForExport } from './selectors';
import { EXPORT_STRINGS } from '../data/constants';

export const mapCVDataForExport = (data: CVData) => {
    return {
        personal: {
            name: data.personalInfo.fullName || EXPORT_STRINGS.labels.na,
            title: data.personalInfo.professionalTitle,
            contactInfo: getContactInfo(data.personalInfo)
        },
        summary: data.summary.text,
        experience: getExperienceForExport(data.experience).map(exp => ({
            company: exp.company,
            position: exp.position,
            dateRange: formatDateRange(exp.startDate, exp.endDate, exp.current, EXPORT_STRINGS.labels.present),
            responsibilities: exp.responsibilities
        })),
        education: getEducationForExport(data.education).map(edu => ({
            school: edu.school,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            dateRange: formatDateRange(edu.startDate, edu.endDate, edu.current, EXPORT_STRINGS.labels.present)
        })),
        skills: getSkillsForExport(data.skills).map(cat => ({
            categoryName: cat.categoryName,
            skillList: cat.skills.filter(Boolean).join(', ')
        })),
        certifications: data.certifications
            .filter(cert => cert.name)
            .map(cert => ({
                name: cert.name,
                issuer: cert.issuer || EXPORT_STRINGS.labels.na,
                date: formatDate(cert.date)
            }))
    };
};

export type ExportStructure = ReturnType<typeof mapCVDataForExport>;
