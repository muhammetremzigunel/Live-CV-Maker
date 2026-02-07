import React from 'react';
import type { WorkExperience } from '../types/cv.types';
import previewStrings from '../data/strings/preview.json';
import { formatDateRange } from '../utils/dateFormatter';

interface Props {
    data: WorkExperience[];
    isPlaceholder?: boolean;
    variant: 'classic' | 'modern';
}

export const ExperiencePreview: React.FC<Props> = ({ data, isPlaceholder, variant }) => {
    if (data.length === 0) return null;

    return (
        <div className={`cv-section ${isPlaceholder ? 'is-placeholder' : ''}`}>
            <h2>{variant === 'modern' ? previewStrings.sections.experience : previewStrings.sections.professionalExperience}</h2>
            {data.map((exp: any) => (
                <div key={exp.id} className="cv-entry">
                    <div className="cv-entry-header">
                        <div className="cv-entry-title">
                            {variant === 'modern' ? (
                                <strong>{exp.position}</strong>
                            ) : (
                                `${exp.position} ${exp.company && `- ${exp.company}`}`
                            )}
                        </div>
                        <div className="cv-entry-date">
                            {formatDateRange(exp.startDate, exp.endDate, exp.current, previewStrings.datePresent)}
                        </div>
                    </div>
                    {variant === 'modern' && exp.company && (
                        <div className="cv-entry-company">{exp.company}</div>
                    )}
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
    );
};
