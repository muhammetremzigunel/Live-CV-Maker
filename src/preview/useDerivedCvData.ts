import { useMemo } from 'react';
import { useCvData } from '../context/CvDataContext';
import { useCvUi } from '../context/CvUiContext';
import { mergeWithPlaceholders } from './placeholderUtils';
import mockCvData from '../data/mock/mockCvData.json';
import type { CVData } from '../types/cv.types';

export const useDerivedCvData = () => {
    const { cvData } = useCvData();
    const { showPlaceholders } = useCvUi();

    const { data: previewData, metadata: placeholderMetadata } = useMemo(() => {
        return mergeWithPlaceholders(cvData, mockCvData as CVData, showPlaceholders);
    }, [cvData, showPlaceholders]);

    return {
        previewData,
        placeholderMetadata
    };
};
