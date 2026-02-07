import React from 'react';
import { useSkillsLogic } from './useSkillsLogic';
import skillsStrings from '../data/strings/skillsStrings.json';


export const SkillsForm: React.FC = () => {
    const {
        skillCategories,
        addCategory,
        removeCategory,
        updateCategoryName,
        addSkill,
        updateSkill,
        removeSkill
    } = useSkillsLogic();

    return (
        <div className="form-section">
            <h2>{skillsStrings.sectionTitle}</h2>
            <p className="form-description">
                {skillsStrings.description}
            </p>

            {skillCategories.map((category: any, catIndex: number) => (
                <div key={category.id} className="skill-category-card">
                    <div className="card-header">
                        <h3>{skillsStrings.categoryCardTitle} {catIndex + 1}</h3>
                        {skillCategories.length > 1 && (
                            <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeCategory(category.id)}
                            >
                                {skillsStrings.removeButton}
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>{skillsStrings.categoryNameLabel}</label>
                        <input
                            type="text"
                            value={category.categoryName}
                            onChange={(e) => updateCategoryName(category.id, e.target.value)}
                            placeholder={skillsStrings.categoryNamePlaceholder}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{skillsStrings.skillsLabel}</label>
                        {category.skills.map((skill: string, skillIndex: number) => (
                            <div key={skillIndex} className="skill-item">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => updateSkill(category.id, skillIndex, e.target.value)}
                                    placeholder={skillsStrings.skillPlaceholder}
                                    required
                                />
                                {category.skills.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove-small"
                                        onClick={() => removeSkill(category.id, skillIndex)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn-add-small"
                            onClick={() => addSkill(category.id)}
                        >
                            {skillsStrings.addSkillButton}
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className="btn-add" onClick={addCategory}>
                {skillsStrings.addCategoryButton}
            </button>
        </div>
    );
};
