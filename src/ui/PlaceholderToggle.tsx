import React from 'react';
import { useCvUi } from '../context/CvUiContext';

export const PlaceholderToggle: React.FC = () => {
    const { showPlaceholders, setShowPlaceholders } = useCvUi();

    return (
        <div className="placeholder-toggle">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={showPlaceholders}
                    onChange={(e) => setShowPlaceholders(e.target.checked)}
                />
                <span className="slider round"></span>
            </label>
            <span className="toggle-label">Show Smart Placeholders</span>
        </div>
    );
};
