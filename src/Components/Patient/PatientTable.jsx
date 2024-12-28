import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import EditPatient from '../GeneralBlock/EditPatient';

export default function PatientList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // To trigger re-fetch and re-render

  // Fetch patients on component mount and whenever refreshKey changes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("https://localhost:7127/api/Patient/Get");
        const data = await response.json();
        setPatients(data.patients || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, [refreshKey]); // Re-fetch patients whenever refreshKey changes

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`https://localhost:7127/api/Patient/Delete/${selectedItem.id}`);
      if (response.status === 200) {
        setPatients(patients.filter((patient) => patient.id !== selectedItem.id));
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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
            <tr key={patient.id} className="table-light" style={{ cursor: "pointer" }}>
              <td>{patient.name}</td>
              <td>{new Date(patient.admissionDate).toLocaleString()}</td>
              <td>{patient.department}</td>
              <td>{patient.pcd}</td>
              <td>{patient.age}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.gender == "Male" ? t("Male") : t("Female")}</td>
              <td>{patient.address}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(patient)}>
                    {t("Delete")}
                  </button>
                  <EditPatient id={patient.id} onUpdate={() => setRefreshKey(prev => prev + 1)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t("CONFIRM DELETION")}</h5>
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
