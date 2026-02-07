import { useCvData } from '../context/CvDataContext';
import { useListLogic } from './useListLogic';
import type { Education } from '../types/cv.types';

export const useEducationLogic = () => {
    const { cvData, updateEducation } = useCvData();

    const {
        addItem: addEducation,
        removeItem: removeEducation,
        updateField: baseUpdateField
    } = useListLogic<Education>(
        cvData.education,
        updateEducation,
        {
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            current: false
        }
    );

    const updateField = <K extends keyof Education>(id: string, field: K, value: Education[K]) => {
        if (field === 'current' && value === true) {
            const updated = cvData.education.map(edu =>
                edu.id === id ? { ...edu, current: true, endDate: '' } : edu
            );
            updateEducation(updated);
        } else {
            baseUpdateField(id, field, value);
        }
    };

    return {
        educationList: cvData.education,
        addEducation,
        removeEducation,
        updateField
    };
};
