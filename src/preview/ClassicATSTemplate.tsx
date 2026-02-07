import React from 'react';
import previewStrings from '../data/strings/preview.json';
import { useDerivedCvData } from './useDerivedCvData';
import { formatDateRange, formatDate } from '../utils/dateFormatter';

export const ClassicATSTemplate: React.FC = () => {
    const { previewData: data, placeholderMetadata: meta } = useDerivedCvData();

    return (
        <div className="ats-template classic">
            {/* Header - Personal Info */}
            {data.personalInfo.fullName && (
                <div className={`cv-header ${meta.personalInfo.fullName ? 'is-placeholder' : ''}`}>
                    <h1>{data.personalInfo.fullName}</h1>
                    {data.personalInfo.professionalTitle && (
                        <div className={`cv-title ${meta.personalInfo.professionalTitle ? 'is-placeholder' : ''}`}>
                            {data.personalInfo.professionalTitle}
                        </div>
                    )}
                    <div className="cv-contact">
                        {data.personalInfo.location && (
                            <span className={meta.personalInfo.location ? 'is-placeholder' : ''}>
                                {data.personalInfo.location}
                            </span>
                        )}
                        {data.personalInfo.email && (
                            <span className={meta.personalInfo.email ? 'is-placeholder' : ''}>
                                {data.personalInfo.email}
                            </span>
                        )}
                        {data.personalInfo.phone && (
                            <span className={meta.personalInfo.phone ? 'is-placeholder' : ''}>
                                {data.personalInfo.phone}
                            </span>
                        )}
                        {data.personalInfo.linkedIn && (
                            <span className={meta.personalInfo.linkedIn ? 'is-placeholder' : ''}>
                                {data.personalInfo.linkedIn}
                            </span>
                        )}
                        {data.personalInfo.github && (
                            <span className={meta.personalInfo.github ? 'is-placeholder' : ''}>
                                {data.personalInfo.github}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Summary */}
            {data.summary.text && (
                <div className={`cv-section ${meta.summary ? 'is-placeholder' : ''}`}>
                    <h2>{previewStrings.sections.professionalSummary}</h2>
                    <p className="cv-summary">{data.summary.text}</p>
                </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
                <div className={`cv-section ${meta.experience ? 'is-placeholder' : ''}`}>
                    <h2>{previewStrings.sections.professionalExperience}</h2>
                    {data.experience.map((exp: any) => (
                        <div key={exp.id} className="cv-entry">
                            <div className="cv-entry-header">
                                <div className="cv-entry-title">
                                    {exp.position} {exp.company && `- ${exp.company}`}
                                </div>
                                <div className="cv-entry-date">
                                    {formatDateRange(exp.startDate, exp.endDate, exp.current, previewStrings.datePresent)}
                                </div>
                            </div>
                            {exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                                <ul className="cv-list">
                                    {exp.responsibilities.map((resp: string, idx: number) => (
                                        resp && <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
                <div className={`cv-section ${meta.education ? 'is-placeholder' : ''}`}>
                    <h2>{previewStrings.sections.education}</h2>
                    {data.education.map((edu: any) => (
                        <div key={edu.id} className="cv-entry">
                            <div className="cv-entry-header">
                                <div className="cv-entry-title">
                                    {edu.degree} {edu.fieldOfStudy && `${previewStrings.labels.in} ${edu.fieldOfStudy}`} {edu.school && `- ${edu.school}`}
                                </div>
                                <div className="cv-entry-date">
                                    {formatDateRange(edu.startDate, edu.endDate, edu.current, previewStrings.datePresent)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
                <div className={`cv-section ${meta.skills ? 'is-placeholder' : ''}`}>
                    <h2>{previewStrings.sections.technicalSkills}</h2>
                    {data.skills.map((category: any) => (
                        category.categoryName && category.skills.length > 0 && category.skills[0] && (
                            <div key={category.id} className="cv-skill-category">
                                <span className="cv-skill-label">{category.categoryName}:</span>
                                <span className="cv-skill-list">
                                    {category.skills.filter((s: string) => s).join(', ')}
                                </span>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
                <div className={`cv-section ${meta.certifications ? 'is-placeholder' : ''}`}>
                    <h2>{previewStrings.sections.certifications}</h2>
                    {data.certifications.map((cert: any) => (
                        cert.name && (
                            <div key={cert.id} className="cv-entry">
                                <div className="cv-entry-header">
                                    <div className="cv-entry-title">
                                        {cert.name} {cert.issuer && `- ${cert.issuer}`}
                                    </div>
                                    {cert.date && (
                                        <div className="cv-entry-date">
                                            {formatDate(cert.date)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};
