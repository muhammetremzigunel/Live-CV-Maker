import React from 'react';
import type { Certification } from '../types/cv.types';
import previewStrings from '../data/strings/preview.json';
import { formatDate } from '../utils/dateFormatter';

interface Props {
    data: Certification[];
    isPlaceholder?: boolean;
    variant: 'classic' | 'modern';
}

export const CertificationsPreview: React.FC<Props> = ({ data, isPlaceholder, variant }) => {
    if (data.length === 0) return null;

    return (
        <div className={`cv-section ${isPlaceholder ? 'is-placeholder' : ''}`}>
            <h2>{previewStrings.sections.certifications}</h2>
            {data.map((cert: Certification) => (
                cert.name && (
                    <div key={cert.id} className="cv-entry">
                        <div className="cv-entry-header">
                            <div className="cv-entry-title">
                                {variant === 'modern' ? (
                                    <strong>{cert.name}</strong>
                                ) : (
                                    `${cert.name} ${cert.issuer && `- ${cert.issuer}`}`
                                )}
                            </div>
                            {cert.date && (
                                <div className="cv-entry-date">
                                    {formatDate(cert.date)}
                                </div>
                            )}
                        </div>
                        {variant === 'modern' && cert.issuer && (
                            <div className="cv-entry-company">{cert.issuer}</div>
                        )}
                    </div>
                )
            ))}
        </div>
    );
};
