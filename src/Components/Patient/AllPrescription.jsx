import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ToastMessage from '../GeneralBlock/ToastMsg';
import SpinnerLoading from "../GeneralBlock/Spinner";

export default function AllPrescriptions() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [toastMessage, setToastMessage] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all prescriptions
        axios
            .get(`https://localhost:7127/api/Generic/AllPrecription?id=${id}`)
            .then((response) => {
                setPrescriptions(response.data);
                setTimeout(() => {
                    setToastMessage(true);
                    setLoading(false);
                }, 1000);
            })
            .catch((error) => {
                console.error("Error fetching prescriptions:", error);
                setError("Failed to fetch prescriptions.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <SpinnerLoading message="Loading!!!!" />;
    }

    return (
        <div className="container mt-5">
            {toastMessage && <ToastMessage type="success" message="Prescriptions Loaded Successfully!" />}
            {error && <ToastMessage type="error" message={error} />}

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h3 className="text-center mb-4">
                        {prescriptions.at(0)?.patientName || ""} {t("'s Prescriptions")}
                    </h3>
                    {prescriptions.length === 0 ? (
                        <p className="text-center">{t("No prescriptions available.")}</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-primary">
                                    <tr>
                                        <th>{t("Created At")}</th>
                                        <th>{t("Medication")}</th>
                                        <th>{t("Dosage")}</th>
                                        <th>{t("Instructions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map((prescription, index) => (
                                        <tr key={index}>
                                            <td>{prescription.createdAt}</td>
                                            <td>{prescription.medication}</td>
                                            <td>{prescription.dosage}</td>
                                            <td>{prescription.instructions}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
