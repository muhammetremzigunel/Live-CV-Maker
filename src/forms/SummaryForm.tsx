import React from 'react';
import { useCvData } from '../context/CvDataContext';
import personalInfoStrings from '../data/strings/personalInfoStrings.json';

export const SummaryForm: React.FC = () => {
    const { cvData, updateSummary } = useCvData();
    const { text } = cvData.summary;

    const handleChange = (value: string) => {
        updateSummary({ text: value });
    };

    return (
        <div className="form-section">
            <h2>{personalInfoStrings.summary.sectionTitle}</h2>
            <p className="form-description">
                {personalInfoStrings.summary.description}
            </p>

            <div className="form-group">
                <label htmlFor="summary">{personalInfoStrings.summary.label}</label>
                <textarea
                    id="summary"
                    value={text}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={personalInfoStrings.summary.placeholder}
                    rows={6}
                    required
                />
                <div className="char-count">{text.length} {personalInfoStrings.summary.characterCount}</div>
            </div>
        </div>
    );
};
