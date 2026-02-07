/**
 * Generates a unique ID (UUID v4) with a fallback for non-secure contexts (HTTP)
 * or older browsers where crypto.randomUUID() is unavailable.
 */
export const generateId = (): string => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    // Fallback implementation for non-secure contexts
    // Based on RFC4122 version 4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
