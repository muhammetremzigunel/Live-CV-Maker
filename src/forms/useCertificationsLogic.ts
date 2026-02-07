import { useCvData } from '../context/CvDataContext';
import { useListLogic } from './useListLogic';
import type { Certification } from '../types/cv.types';

export const useCertificationsLogic = () => {
    const { cvData, updateCertifications } = useCvData();

    const {
        addItem: addCertification,
        removeItem: removeCertification,
        updateField
    } = useListLogic<Certification>(
        cvData.certifications,
        updateCertifications,
        { name: '', issuer: '', date: '' }
    );

    return {
        certifications: cvData.certifications,
        addCertification,
        removeCertification,
        updateField
    };
};
