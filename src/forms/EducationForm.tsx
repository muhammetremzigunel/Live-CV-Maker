import React from 'react';
import { useEducationLogic } from './useEducationLogic';
import educationStrings from '../data/strings/educationStrings.json';
import { MonthInput } from '../ui/MonthInput';


export const EducationForm: React.FC = () => {
    const {
        educationList,
        addEducation,
        removeEducation,
        updateField
    } = useEducationLogic();

    return (
        <div className="form-section">
            <h2>{educationStrings.sectionTitle}</h2>

            {educationList.map((edu: any, index: number) => (
                <div key={edu.id} className="education-card">
                    <div className="card-header">
                        <h3>{educationStrings.cardTitle} {index + 1}</h3>
                        {educationList.length > 1 && (
                            <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeEducation(edu.id)}
                            >
                                {educationStrings.removeButton}
                            </button>
                        )}
                    </div>

                    <div className="form-group">
                        <label>{educationStrings.schoolLabel}</label>
                        <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateField(edu.id, 'school', e.target.value)}
                            placeholder={educationStrings.schoolPlaceholder}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{educationStrings.degreeLabel}</label>
                        <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateField(edu.id, 'degree', e.target.value)}
                            placeholder={educationStrings.degreePlaceholder}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{educationStrings.fieldOfStudyLabel}</label>
                        <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateField(edu.id, 'fieldOfStudy', e.target.value)}
                            placeholder={educationStrings.fieldOfStudyPlaceholder}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <MonthInput
                            label={educationStrings.startDateLabel}
                            value={edu.startDate}
                            onChange={(val) => updateField(edu.id, 'startDate', val)}
                            required
                        />

                        <MonthInput
                            label={educationStrings.endDateLabel}
                            value={edu.endDate}
                            onChange={(val) => updateField(edu.id, 'endDate', val)}
                            disabled={edu.current}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={edu.current}
                                onChange={(e) => updateField(edu.id, 'current', e.target.checked)}
                            />
                            {educationStrings.currentCheckbox}
                        </label>
                    </div>
                </div>
            ))}

            <button type="button" className="btn-add" onClick={addEducation}>
                {educationStrings.addEducationButton}
            </button>
        </div>
    );
};
