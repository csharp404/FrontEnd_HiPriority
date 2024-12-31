import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import EditPatient from "../GeneralBlock/EditPatient";
import ToastMessage from "../GeneralBlock/ToastMsg";
import SpinnerLoading from "../GeneralBlock/Spinner";


export default function PatientList() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const [toastMessage, setToastMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Triggers re-fetch on changes


  useEffect(() => {
    const fetchPatients = async () => {
      try {

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay (1 second)
        const response = await axios.get("https://localhost:7127/api/Patient/Get");
        setPatients(response.data.patients || []);
        setToastMessage({ type: "success", message: t("Patient Data Loaded Successfully!") });
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(t("Failed To Fetch Patients."));
      } finally {
        setLoading(false);

      }
    };

    fetchPatients();

  }, [refreshKey]);


  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`https://localhost:7127/api/Patient/Delete/${selectedItem.id}`);
      if (response.status === 200) {
        setPatients(patients.filter((patient) => patient.id !== selectedItem.id));

        setToastMessage({ type: "success", message: t("Patient deleted successfully.") });
      }
    } catch (err) {
      console.error("Error deleting patient:", err);
      setToastMessage({ type: "error", message: t("Failed to delete patient.") });

    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };


  if (loading) {
    return <SpinnerLoading message={t("Loading...")} />;
  }

  return (
    <>
      {toastMessage && <ToastMessage type={toastMessage.type} message={toastMessage.message} />}

      {error && <ToastMessage type="error" message={error} />}


      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">{t("Name")}</th>
            <th scope="col">{t("Admission Date")}</th>
            <th scope="col">{t("Department")}</th>
            <th scope="col">{t("PCD Name")}</th>
            <th scope="col">{t("Age")}</th>
            <th scope="col">{t("Phone")}</th>
            <th scope="col">{t("Gender")}</th>
            <th scope="col">{t("Address")}</th>
            <th scope="col">{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="table-light">

              <td>{patient.name}</td>
              <td>{new Date(patient.admissionDate).toLocaleString()}</td>
              <td>{patient.department}</td>
              <td>{patient.pcd}</td>
              <td>{patient.age}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.gender === "Male" ? t("Male") : t("Female")}</td>
              <td>{patient.address}</td>
              <td>
                <EditPatient id={patient.id} onUpdate={() => setRefreshKey((prev) => prev + 1)} />

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton-${patient.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("Actions")}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${patient.id}`}>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeleteClick(patient)}
                      >
                        {t("Delete")}
                      </button>
                    </li>
                   
                    <li>
                      <NavLink className="dropdown-item" to={`/all-prescription/${patient.id}`}>
                        {t("All Prescription")}
                      </NavLink>

                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={`/create-vital-signs/${patient.id}`}>
                        {t("Issue Vital Signs")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={`/history-vital-signs/${patient.id}`}>
                        {t("History Vital Signs")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to={`/prescription/${patient.id}`}>
                        {t("Issue Prescription")}

                      </NavLink>
                    </li>
                   <li>
                      <NavLink className="dropdown-item" to={`/diagnosis/${patient.id}`}>
                        {t("get Diagnosis")}
                      </NavLink>
                    </li> 

                      <NavLink className="dropdown-item" to={`/create-prescription/${patient.id}`}>
                        {t("Issue Prescription")}

                      </NavLink>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t("Confirm Deletion")}</h5>

                <button type="button" className="btn-close" onClick={handleDeleteCancel}></button>
              </div>
              <div className="modal-body">
                {t("Are you sure you want to delete this record?")}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleDeleteCancel}>
                  {t("Cancel")}
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                  {t("Confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
