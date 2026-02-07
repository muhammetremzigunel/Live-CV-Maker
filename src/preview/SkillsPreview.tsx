import React from 'react';
import type { SkillCategory } from '../types/cv.types';
import previewStrings from '../data/strings/preview.json';

interface Props {
    data: SkillCategory[];
    isPlaceholder?: boolean;
    variant: 'classic' | 'modern';
}

export const SkillsPreview: React.FC<Props> = ({ data, isPlaceholder, variant }) => {
    if (data.length === 0) return null;

    return (
        <div className={`cv-section ${isPlaceholder ? 'is-placeholder' : ''}`}>
            <h2>{variant === 'modern' ? previewStrings.sections.skills : previewStrings.sections.technicalSkills}</h2>
            {data.map((category: any) => (
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
    );
};
