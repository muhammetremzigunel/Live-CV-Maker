import React from 'react';
import { useCvUi } from '../context/CvUiContext';
import websiteStrings from '../data/strings/website.json';

const stepLabelKeys = [
    'personalInfo',
    'summary',
    'experience',
    'education',
    'skills',
    'certifications'
] as const;

export const FormStepper: React.FC = () => {
    const { currentStep, setCurrentStep } = useCvUi();
    const steps = stepLabelKeys.map(key => websiteStrings.steps[key as keyof typeof websiteStrings.steps]);

    return (
        <div className="form-stepper">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`stepper-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                    onClick={() => setCurrentStep(index)}
                >
                    <div className="stepper-number">{index + 1}</div>
                    <div className="stepper-label">{step}</div>
                </div>
            ))}
        </div>
    );
};
