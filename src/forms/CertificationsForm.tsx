import React from 'react';
import { useCertificationsLogic } from './useCertificationsLogic';
import certificationsStrings from '../data/strings/certificationsStrings.json';
import { MonthInput } from '../ui/MonthInput';


export const CertificationsForm: React.FC = () => {
    const {
        certifications,
        addCertification,
        removeCertification,
        updateField
    } = useCertificationsLogic();

    return (
        <div className="form-section">
            <h2>{certificationsStrings.sectionTitle}</h2>
            <p className="form-description">
                {certificationsStrings.description}
            </p>

            {certifications.length === 0 ? (
                <div className="empty-state">
                    <p>{certificationsStrings.emptyState}</p>
                </div>
            ) : (
                certifications.map((cert: any, index: number) => (
                    <div key={cert.id} className="certification-card">
                        <div className="card-header">
                            <h3>{certificationsStrings.cardTitle} {index + 1}</h3>
                            <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeCertification(cert.id)}
                            >
                                {certificationsStrings.removeButton}
                            </button>
                        </div>

                        <div className="form-group">
                            <label>{certificationsStrings.nameLabel}</label>
                            <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => updateField(cert.id, 'name', e.target.value)}
                                placeholder={certificationsStrings.namePlaceholder}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>{certificationsStrings.issuerLabel}</label>
                            <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateField(cert.id, 'issuer', e.target.value)}
                                placeholder={certificationsStrings.issuerPlaceholder}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <MonthInput
                                label={certificationsStrings.dateLabel}
                                value={cert.date}
                                onChange={(val) => updateField(cert.id, 'date', val)}
                                required
                            />
                        </div>
                    </div>
                ))
            )}

            <button type="button" className="btn-add" onClick={addCertification}>
                {certificationsStrings.addButton}
            </button>
        </div>
    );
};
