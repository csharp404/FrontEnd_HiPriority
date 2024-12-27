import React, { useState } from "react";

export default function PatientForm() {
  const [patient, setpatient] = useState({
    firstName: "",
    lastName: "",
    admissionDate: "",
    department: "",
    pcdName: "",
    age: "",
    phone: "",
    gender: "",
    email: "",
    details: "",
    address: "",
    legalGuardianName: "",
    legalGuardianPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpatient({
      ...patient,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(patient);
    // Handle form submission logic
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-white bg-primary py-3 rounded-top">
              {t("Add New Patient")}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Patient Name */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    {t("First Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="firstName"
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    {t("Last Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="lastName"
                    name="lastName"
                    value={patient.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Admission Details */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="admissionDate" className="form-label">
                    {t("Admission Date")}
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="admissionDate"
                    name="admissionDate"
                    value={patient.admissionDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="department" className="form-label">
                    {t("Department")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="department"
                    name="department"
                    value={patient.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Patient Care Details */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="pcdName" className="form-label">
                   {t(" PCD Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="pcdName"
                    name="pcdName"
                    value={patient.pcdName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="age" className="form-label">
                    {t("Age")}
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="age"
                    name="age"
                    value={patient.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    {t("Phone")}
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    id="phone"
                    name="phone"
                    value={patient.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    {t("Gender")}
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="gender"
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("Select Gender")}</option>
                    <option value="Male">{t("Male")}</option>
                    <option value="Female">{t("Female")}</option>
                  </select>
                </div>
              </div>

              {/* Address and Details */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="address" className="form-label">
                    {t("Address")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="address"
                    name="address"
                    value={patient.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="details" className="form-label">
                    {t("Details")}
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="details"
                    name="details"
                    value={patient.details}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Legal Guardian Information */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="legalGuardianName" className="form-label">
                    {t("Legal Guardian Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="legalGuardianName"
                    name="legalGuardianName"
                    value={patient.legalGuardianName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="legalGuardianPhone" className="form-label">
                    {t("Legal Guardian Phone")}
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    id="legalGuardianPhone"
                    name="legalGuardianPhone"
                    value={patient.legalGuardianPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100 mt-4"
              >
                {t("Add")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
