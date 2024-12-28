import React, { useState, useEffect } from "react";

export default function PatientForm() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    departmentId: "",
    pcd: "",
    age: "",
    phoneNumber: "",
    gender: true, // true represents Male, false represents Female
    bloodType: "",
    areaId: "",
    cityId: "",
    legalGuardianPhone: "",
    legalGuardianName: "",
  });

  const [message, setMessage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [pcds, setPcds] = useState([]); 
  useEffect(() => {
    fetch("https://localhost:7127/api/Generic/Departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));

    fetch("https://localhost:7127/api/Generic/Cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    if (patient.cityId) {
      fetch(`https://localhost:7127/api/Generic/Areas/${patient.cityId}`)
        .then((res) => res.json())
        .then((data) => setAreas(data))
        .catch((err) => console.error("Error fetching areas:", err));
    }
  }, [patient.cityId]);

  useEffect(() => {
    if (patient.departmentId) {
      fetch(`https://localhost:7127/api/User/user/1/${patient.departmentId}`)
        .then((res) => res.json())
        .then((data) => setPcds(data.doctorsCard)) // Set PCDs from the API response
        .catch((err) => console.error("Error fetching PCDs:", err));
    }
  }, [patient.departmentId]); // Trigger fetching PCDs whenever departmentId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: name === "gender" ? value === "true" : value, // Convert gender to boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log(patient);
      
      const response = await fetch("https://localhost:7127/api/Patient/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...patient,
          departmentId: parseInt(patient.departmentId),
          age: parseInt(patient.age),
          areaId: parseInt(patient.areaId),
          cityId: parseInt(patient.cityId),
          gender: patient.gender, // gender remains boolean
        }),
      });

      if (response.ok) {
        setMessage("Patient added successfully!");
        setPatient({
          firstName: "",
          lastName: "",
          departmentId: "",
          pcd: "",
          age: "",
          phoneNumber: "",
          gender: true, // Reset gender to true (Male)
          bloodType: "",
          areaId: "",
          cityId: "",
          legalGuardianPhone: "",
          legalGuardianName: "",
          userId: "",
        });
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-white bg-primary py-3 rounded-top">
              Add New Patient
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={patient.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    value={patient.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={patient.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={patient.gender.toString()} // Convert boolean to string for display
                    onChange={handleChange}
                    required
                  >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="bloodType" className="form-label">
                    Blood Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bloodType"
                    name="bloodType"
                    value={patient.bloodType}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="departmentId" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-control"
                    id="departmentId"
                    name="departmentId"
                    value={patient.departmentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="pcd" className="form-label">
                    PCD (Personal Code)
                  </label>
                  <select
                    className="form-control"
                    id="pcd"
                    name="pcd"
                    value={patient.pcd}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select PCD</option>
                    {pcds.map((pcd) => (
                      <option key={pcd.id} value={pcd.id}>
                        {pcd.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="areaId" className="form-label">
                    Area
                  </label>
                  <select
                    className="form-control"
                    id="areaId"
                    name="areaId"
                    value={patient.areaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Area</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="cityId" className="form-label">
                    City
                  </label>
                  <select
                    className="form-control"
                    id="cityId"
                    name="cityId"
                    value={patient.cityId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="legalGaurdainName" className="form-label">
                    Legal Guardian Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="legalGaurdainName"
                    name="legalGaurdainName"
                    value={patient.legalGaurdainName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="legalGaurdainPhone" className="form-label">
                    Legal Guardian Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="legalGaurdainPhone"
                    name="legalGaurdainPhone"
                    value={patient.legalGaurdainPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 mt-4">
                Add Patient
              </button>
            </form>

            {message && <p className="mt-3 text-center">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
