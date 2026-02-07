import React from 'react';
import type { Education } from '../types/cv.types';
import previewStrings from '../data/strings/preview.json';
import { formatDateRange } from '../utils/dateFormatter';

interface Props {
    data: Education[];
    isPlaceholder?: boolean;
    variant: 'classic' | 'modern';
}

export const EducationPreview: React.FC<Props> = ({ data, isPlaceholder, variant }) => {
    if (data.length === 0) return null;

    return (
        <div className={`cv-section ${isPlaceholder ? 'is-placeholder' : ''}`}>
            <h2>{previewStrings.sections.education}</h2>
            {data.map((edu: any) => (
                <div key={edu.id} className="cv-entry">
                    <div className="cv-entry-header">
                        <div className="cv-entry-title">
                            {variant === 'modern' ? (
                                <strong>{edu.degree}</strong>
                            ) : (
                                `${edu.degree} ${edu.fieldOfStudy && `${previewStrings.labels.in} ${edu.fieldOfStudy}`} ${edu.school && `- ${edu.school}`}`
                            )}
                            {variant === 'modern' && edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                        </div>
                        <div className="cv-entry-date">
                            {formatDateRange(edu.startDate, edu.endDate, edu.current, previewStrings.datePresent)}
                        </div>
                    </div>
                    {variant === 'modern' && edu.school && (
                        <div className="cv-entry-company">{edu.school}</div>
                    )}
                </div>
            ))}
        </div>
    );
};
