import React, { useMemo } from 'react';


interface MonthInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

const MONTHS = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
];

export const MonthInput: React.FC<MonthInputProps> = ({
    value,
    onChange,
    label,
    required,
    disabled
}) => {
    const { year, month } = useMemo(() => {
        if (!value) return { year: '', month: '' };
        const parts = value.split('-');
        return {
            year: parts[0] || '',
            month: parts[1] || ''
        };
    }, [value]);

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 1950;
        const result = [];
        for (let y = currentYear; y >= startYear; y--) {
            result.push(y.toString());
        }
        return result;
    }, []);

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = e.target.value;
        const newYear = year || new Date().getFullYear().toString();
        onChange(`${newYear}-${newMonth}`);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = e.target.value;
        const newMonth = month || '01';
        onChange(`${newYear}-${newMonth}`);
    };

    return (
        <div className="month-input-container">
            {label && <label className="month-input-label">{label}</label>}
            <div className="month-input-fields">
                <select
                    value={month}
                    onChange={handleMonthChange}
                    required={required}
                    disabled={disabled}
                    className="month-input-select"
                >
                    <option value="" disabled>Month</option>
                    {MONTHS.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
                <select
                    value={year}
                    onChange={handleYearChange}
                    required={required}
                    disabled={disabled}
                    className="month-input-select"
                >
                    <option value="" disabled>Year</option>
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
