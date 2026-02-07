import { useCvData } from '../context/CvDataContext';
import { useListLogic } from './useListLogic';
import type { WorkExperience } from '../types/cv.types';

export const useExperienceLogic = () => {
    const { cvData, updateExperience } = useCvData();

    const {
        addItem: addExperience,
        removeItem: removeExperience,
        updateField: baseUpdateField,
        updateNestedList
    } = useListLogic<WorkExperience>(
        cvData.experience,
        updateExperience,
        {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: ['']
        }
    );

    const updateField = <K extends keyof WorkExperience>(id: string, field: K, value: WorkExperience[K]) => {
        if (field === 'current' && value === true) {
            const updated = cvData.experience.map(exp =>
                exp.id === id ? { ...exp, current: true, endDate: '' } : exp
            );
            updateExperience(updated);
        } else {
            baseUpdateField(id, field, value);
        }
    };

    const addResponsibility = (id: string) =>
        updateNestedList(id, 'responsibilities', -1, '', 'add');

    const updateResponsibility = (id: string, index: number, value: string) =>
        updateNestedList(id, 'responsibilities', index, value, 'update');

    const removeResponsibility = (id: string, index: number) =>
        updateNestedList(id, 'responsibilities', index, '', 'remove');

    return {
        experiences: cvData.experience,
        addExperience,
        removeExperience,
        updateField,
        addResponsibility,
        updateResponsibility,
        removeResponsibility
    };
};
