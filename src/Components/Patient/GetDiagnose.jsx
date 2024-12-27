import React from 'react';
import { Link } from 'react-router-dom';

const DiagnosisCard = ({ diagnosis }) => {
  if (!diagnosis) {
    return <p className="text-center text-muted">{t("No Diagnosis Available.")}</p>;
  }

  const { patientId, symptoms, diagnosisText, notes } = diagnosis;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{t("Diagnosis Details")}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>{t("Patient ID:")}</strong>
            <p className="mb-1">{patientId}</p>
          </div>
          <div className="mb-3">
            <strong>{t("Symptoms:")}</strong>
            <p className="mb-1">{symptoms}</p>
          </div>
          <div className="mb-3">
            <strong>{t("Diagnosis:")}</strong>
            <p className="mb-1">{diagnosisText}</p>
          </div>
          <div className="mb-3">
            <strong>{t("Notes:")}</strong>
            <p className="mb-1">{notes || t("No Notes Provided.")}</p>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="text-muted">{t("Last updated:")} {new Date().toLocaleDateString()}</span>
          <Link to={`/edit-diagnosis`} className="btn btn-primary btn-sm">
            {t("Edit")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisCard;
