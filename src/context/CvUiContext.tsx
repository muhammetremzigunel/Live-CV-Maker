import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { TemplateType } from '../types/cv.types';

interface CvUiContextType {
    currentStep: number;
    selectedTemplate: TemplateType;
    showPlaceholders: boolean;
    setCurrentStep: (step: number) => void;
    setSelectedTemplate: (template: TemplateType) => void;
    setShowPlaceholders: (show: boolean) => void;
    isMobilePreviewOpen: boolean;
    toggleMobilePreview: () => void;
}

const CvUiContext = createContext<CvUiContextType | undefined>(undefined);

export const CvUiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');
    const [showPlaceholders, setShowPlaceholders] = useState<boolean>(true);
    const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false);

    const toggleMobilePreview = () => setIsMobilePreviewOpen(prev => !prev);

    const value = useMemo(() => ({
        currentStep,
        selectedTemplate,
        showPlaceholders,
        isMobilePreviewOpen,
        setCurrentStep,
        setSelectedTemplate,
        setShowPlaceholders,
        toggleMobilePreview
    }), [currentStep, selectedTemplate, showPlaceholders, isMobilePreviewOpen]);

    return (
        <CvUiContext.Provider value={value}>
            {children}
        </CvUiContext.Provider>
    );
};

export const useCvUi = () => {
    const context = useContext(CvUiContext);
    if (!context) {
        throw new Error('useCvUi must be used within CvUiProvider');
    }
    return context;
};
