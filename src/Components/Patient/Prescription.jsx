import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function PrescriptionDetails() {
  const { t } = useTranslation();
    const {id}  = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    // Fetch prescription details
    axios
      .get(`https://localhost:7127/api/Generic/Precription?id=${id}`)
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        console.error("Error fetching prescription details:", error);
      });
  }, [id]);

  if (!prescription) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading prescription details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>{t("Prescription Details")}</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>{t("Patient Name")}</strong>
                <p>{prescription.patientName}</p>
              </div>
              <div className="mb-3">
                <strong>{t("Medication")}</strong>
                <p>{prescription.medication}</p>
              </div>

              <div className="mb-3">
                <strong>{t("Dosage")}</strong>
                <p>{prescription.dosage}</p>
              </div>

              <div className="mb-3">
                <strong>{t("Instructions")}</strong>
                <p>{prescription.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
