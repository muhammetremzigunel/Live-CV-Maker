import { format, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

/**
 * Formats a date string (YYYY-MM) to "Month YYYY" using English locale.
 * @param dateStr Date string in YYYY-MM format
 * @returns Formatted date string or empty string if invalid
 */
export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
        // Append -01 to make it a valid date for parsing if it's only YYYY-MM
        const date = dateStr.length === 7 ? parse(dateStr + '-01', 'yyyy-MM-dd', new Date()) : new Date(dateStr);
        return format(date, 'MMMM yyyy', { locale: enUS });
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateStr;
    }
};

/**
 * Formats a date range for display.
 * @param startDate Start date (YYYY-MM)
 * @param endDate End date (YYYY-MM)
 * @param current Whether the role is current
 * @param presentText Text to show for current roles (e.g., "Present")
 * @returns Formatted date range (e.g., "January 2022 – March 2024" or "January 2022 – Present")
 */
export const formatDateRange = (
    startDate: string,
    endDate: string,
    current: boolean,
    presentText: string = 'Present'
): string => {
    if (!startDate) return '';

    const startFormatted = formatDate(startDate);
    const endFormatted = current ? presentText : (endDate ? formatDate(endDate) : '');

    if (startFormatted && endFormatted) {
        return `${startFormatted} – ${endFormatted}`;
    }

    return startFormatted;
};
