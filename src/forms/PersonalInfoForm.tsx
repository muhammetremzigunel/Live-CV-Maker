import React, { useState } from 'react';
import type { PersonalInfo } from '../types/cv.types';
import { useCvData } from '../context/CvDataContext';
import personalInfoStrings from '../data/strings/personalInfoStrings.json';


export const PersonalInfoForm: React.FC = () => {
    const { cvData, updatePersonalInfo } = useCvData();
    const { personalInfo } = cvData;
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (field: keyof PersonalInfo, value: string) => {
        let error = '';
        if (field === 'email') {
            if (value && !value.includes('@')) {
                error = 'Invalid email format';
            }
        } else if (field === 'phone') {
            // Allow only numbers, spaces, plus sign, and dashes
            if (value && !/^[0-9+\-\s]*$/.test(value)) {
                error = 'Invalid phone number format';
            }
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const handleChange = (field: keyof PersonalInfo, value: string) => {
        updatePersonalInfo({ ...personalInfo, [field]: value });
        if (errors[field]) {
            validateField(field, value);
        }
    };

    const handleBlur = (field: keyof PersonalInfo) => {
        validateField(field, personalInfo[field] || '');
    };

    return (
        <div className="form-section">
            <h2>{personalInfoStrings.sectionTitle}</h2>

            <div className="form-group">
                <label htmlFor="fullName">{personalInfoStrings.fullNameLabel}</label>
                <input
                    type="text"
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder={personalInfoStrings.fullNamePlaceholder}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="professionalTitle">{personalInfoStrings.professionalTitleLabel}</label>
                <input
                    type="text"
                    id="professionalTitle"
                    value={personalInfo.professionalTitle}
                    onChange={(e) => handleChange('professionalTitle', e.target.value)}
                    placeholder={personalInfoStrings.professionalTitlePlaceholder}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="location">{personalInfoStrings.locationLabel}</label>
                <input
                    type="text"
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder={personalInfoStrings.locationPlaceholder}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">{personalInfoStrings.emailLabel}</label>
                <input
                    type="email"
                    id="email"
                    className={errors.email ? 'input-error' : ''}
                    value={personalInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder={personalInfoStrings.emailPlaceholder}
                    required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="phone">{personalInfoStrings.phoneLabel}</label>
                <input
                    type="tel"
                    id="phone"
                    className={errors.phone ? 'input-error' : ''}
                    value={personalInfo.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder={personalInfoStrings.phonePlaceholder}
                    required
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="linkedIn">{personalInfoStrings.linkedInLabel}</label>
                <input
                    type="url"
                    id="linkedIn"
                    value={personalInfo.linkedIn || ''}
                    onChange={(e) => handleChange('linkedIn', e.target.value)}
                    placeholder={personalInfoStrings.linkedInPlaceholder}
                />
            </div>

            <div className="form-group">
                <label htmlFor="github">{personalInfoStrings.githubLabel}</label>
                <input
                    type="url"
                    id="github"
                    value={personalInfo.github || ''}
                    onChange={(e) => handleChange('github', e.target.value)}
                    placeholder={personalInfoStrings.githubPlaceholder}
                />
            </div>
        </div>
    );
};
