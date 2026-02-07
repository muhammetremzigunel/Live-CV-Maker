import { useCvData } from '../context/CvDataContext';
import { useListLogic } from './useListLogic';
import type { SkillCategory } from '../types/cv.types';

export const useSkillsLogic = () => {
    const { cvData, updateSkills } = useCvData();

    const {
        addItem: addCategory,
        removeItem: removeCategory,
        updateField,
        updateNestedList
    } = useListLogic<SkillCategory>(
        cvData.skills,
        updateSkills,
        {
            categoryName: '',
            skills: ['']
        }
    );

    const updateCategoryName = (id: string, name: string) =>
        updateField(id, 'categoryName', name);

    const addSkill = (categoryId: string) =>
        updateNestedList(categoryId, 'skills', -1, '', 'add');

    const updateSkill = (categoryId: string, index: number, value: string) =>
        updateNestedList(categoryId, 'skills', index, value, 'update');

    const removeSkill = (categoryId: string, index: number) =>
        updateNestedList(categoryId, 'skills', index, '', 'remove');

    return {
        skillCategories: cvData.skills,
        addCategory,
        removeCategory,
        updateCategoryName,
        addSkill,
        updateSkill,
        removeSkill
    };
};
