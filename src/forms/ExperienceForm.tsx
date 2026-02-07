import React from 'react';
import { useExperienceLogic } from './useExperienceLogic';
import experienceStrings from '../data/strings/experienceStrings.json';
import { MonthInput } from '../ui/MonthInput';


export const ExperienceForm: React.FC = () => {
    const {
        experiences,
        addExperience,
        removeExperience,
        updateField,
        addResponsibility,
        updateResponsibility,
        removeResponsibility
    } = useExperienceLogic();

    return (
        <div className="form-section">
            <h2>{experienceStrings.sectionTitle}</h2>

            {experiences.map((exp: any, expIndex: number) => (
                <div key={exp.id} className="experience-card">
                    <div className="card-header">
                        <h3>{experienceStrings.cardTitle} {expIndex + 1}</h3>
                        {experiences.length > 1 && (
                            <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeExperience(exp.id)}
                            >
                                {experienceStrings.removeButton}
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>{experienceStrings.companyLabel}</label>
                        <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateField(exp.id, 'company', e.target.value)}
                            placeholder={experienceStrings.companyPlaceholder}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{experienceStrings.positionLabel}</label>
                        <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateField(exp.id, 'position', e.target.value)}
                            placeholder={experienceStrings.positionPlaceholder}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <MonthInput
                            label={experienceStrings.startDateLabel}
                            value={exp.startDate}
                            onChange={(val) => updateField(exp.id, 'startDate', val)}
                            required
                        />

                        <MonthInput
                            label={experienceStrings.endDateLabel}
                            value={exp.endDate}
                            onChange={(val) => updateField(exp.id, 'endDate', val)}
                            disabled={exp.current}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateField(exp.id, 'current', e.target.checked)}
                            />
                            {experienceStrings.currentCheckbox}
                        </label>
                    </div>

                    <div className="form-group">
                        <label>{experienceStrings.responsibilitiesLabel}</label>
                        {exp.responsibilities.map((resp: string, respIndex: number) => (
                            <div key={respIndex} className="responsibility-item">
                                <textarea
                                    value={resp}
                                    onChange={(e) => updateResponsibility(exp.id, respIndex, e.target.value)}
                                    placeholder={experienceStrings.responsibilityPlaceholder}
                                    rows={2}
                                    required
                                />
                                {exp.responsibilities.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-remove-small"
                                        onClick={() => removeResponsibility(exp.id, respIndex)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn-add-small"
                            onClick={() => addResponsibility(exp.id)}
                        >
                            {experienceStrings.addResponsibilityButton}
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className="btn-add" onClick={addExperience}>
                {experienceStrings.addExperienceButton}
            </button>
        </div>
    );
};
