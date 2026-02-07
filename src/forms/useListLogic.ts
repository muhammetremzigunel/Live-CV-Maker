import { useCallback } from 'react';
import { generateId } from '../utils/idGenerator';

export const useListLogic = <T extends { id: string }>(
    items: T[],
    updateFn: (items: T[]) => void,
    defaultItem: Omit<T, 'id'>
) => {
    const addItem = useCallback(() => {
        const newItem = {
            ...defaultItem,
            id: generateId()
        } as T;
        updateFn([...items, newItem]);
    }, [items, updateFn, defaultItem]);

    const removeItem = useCallback((id: string) => {
        updateFn(items.filter(item => item.id !== id));
    }, [items, updateFn]);

    const updateField = useCallback(<K extends keyof T>(id: string, field: K, value: T[K]) => {
        const updated = items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateFn(updated);
    }, [items, updateFn]);

    const updateNestedList = useCallback((
        id: string,
        nestedField: keyof T,
        index: number,
        value: string,
        action: 'add' | 'update' | 'remove'
    ) => {
        const updated = items.map(item => {
            if (item.id !== id) return item;

            const list = [...(item[nestedField] as unknown as string[])];

            if (action === 'add') {
                list.push('');
            } else if (action === 'update') {
                list[index] = value;
            } else if (action === 'remove') {
                list.splice(index, 1);
            }

            return { ...item, [nestedField]: list };
        });
        updateFn(updated);
    }, [items, updateFn]);

    return {
        addItem,
        removeItem,
        updateField,
        updateNestedList
    };
};
