import React, { useRef } from 'react';
import { useCvUi } from '../context/CvUiContext';
import { usePreviewScale } from './usePreviewScale';
import { FormStepper } from './FormStepper';
import { CVDownloadButtons } from '../preview/CVDownloadButtons';
import { FORM_STEPS, MAX_STEP, CV_TEMPLATES, DEFAULT_TEMPLATE } from '../data/constants';
import websiteStrings from '../data/strings/website.json';
const logo = '/logo.png';
import { PlaceholderToggle } from './PlaceholderToggle';

const FormRenderer: React.FC = () => {
    const { currentStep } = useCvUi();
    const StepComponent = FORM_STEPS.find(s => s.id === currentStep)?.component || FORM_STEPS[0].component;
    return <StepComponent />;
};

const TemplateRenderer: React.FC = () => {
    const { selectedTemplate } = useCvUi();
    const TemplateComponent = CV_TEMPLATES.find(t => t.id === selectedTemplate)?.component ||
        CV_TEMPLATES.find(t => t.id === DEFAULT_TEMPLATE)?.component ||
        CV_TEMPLATES[0].component;

    return <TemplateComponent />;
};

export const AppLayout: React.FC = () => {
    const { currentStep, setCurrentStep, isMobilePreviewOpen, toggleMobilePreview } = useCvUi();
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const scale = usePreviewScale(previewContainerRef, 794);

    const handleNext = () => {
        if (currentStep < MAX_STEP) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className={`app-layout ${isMobilePreviewOpen ? 'mobile-preview-open' : ''}`}>
            <div className="mobile-header d-lg-none">
                <div className="mobile-logo-section">
                    <img src={logo} alt="Logo" height="40" />
                    <h2>CV Maker</h2>
                </div>
                <button
                    className="btn-toggle-preview"
                    onClick={toggleMobilePreview}
                >
                    {isMobilePreviewOpen ? 'Edit Form' : 'Show Preview'}
                </button>
            </div>

            <div className={`form-panel ${isMobilePreviewOpen ? 'hidden-mobile' : ''}`}>
                <div className="app-header d-none d-lg-block">
                    <div className="app-header-content">
                        <img src={logo} alt="Live CV Maker Logo" className="app-logo" />
                        <div className="app-header-text">
                            <h1>{websiteStrings.appTitle}</h1>
                            <p>{websiteStrings.appDescription}</p>
                        </div>
                    </div>
                </div>

                <FormStepper />

                <div className="form-container">
                    <FormRenderer />

                    <div className="form-navigation">
                        <button
                            type="button"
                            className="btn-nav"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                        >
                            {websiteStrings.previousButton}
                        </button>
                        <button
                            type="button"
                            className="btn-nav"
                            onClick={handleNext}
                            disabled={currentStep === MAX_STEP}
                        >
                            {websiteStrings.nextButton}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`preview-panel ${isMobilePreviewOpen ? 'visible-mobile' : ''}`} ref={previewContainerRef}>
                <div className="preview-header">
                    <h2>{websiteStrings.previewPanelTitle}</h2>
                    <div className="preview-controls">
                        <PlaceholderToggle />
                        <CVDownloadButtons />
                    </div>
                </div>

                <div
                    className="cv-preview-container"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                        height: 'auto',
                        minHeight: '1130px'
                    }}
                >
                    <div className="cv-preview A4" id="cv-content" ref={contentRef}>
                        <TemplateRenderer />
                    </div>
                </div>
            </div>
        </div>
    );
};
