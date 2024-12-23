import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded first
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function DoctorForm() {
    const { t, i18n } = useTranslation();
  const [doctor, setDoctor] = useState({
    FirstName: "",
    LastName: "",
    Password: "",
    ConfirmPassword: "",
    experience: "",
    age: 0,
    phonenumber: "",
    gender: 1, // Default value (1 for Male)
    email: "",
    areaid: "1", // Default empty value for areaid
    departmentid: "1", // Default empty value for departmentid
    cityid: "1", // Default empty value for cityid
    role: "1", // Default value for Doctor role
  });

  const [areas, setAreas] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch departments and cities once on component mount
  useEffect(() => {
    axios
      .get("https://localhost:7127/api/Generic/Departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(t("Error loading departments:"), error);
      });

    axios
      .get("https://localhost:7127/api/Generic/Cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error loading cities:", error);
      });
  }, []);

  // Fetch areas based on the selected city
  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setDoctor({
      ...doctor,
      cityid: selectedCityId, // Update selected city ID
    });

    if (selectedCityId) {
      axios
        .get(`https://localhost:7127/api/Generic/Areas/${selectedCityId}`)
        .then((response) => {
          setAreas(response.data);
        })
        .catch((error) => {
          console.error("Error loading areas:", error);
        });
    } else {
      setAreas([]); // Clear areas if no city is selected
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      FirstName: doctor.FirstName,
      LastName: doctor.LastName,
      PhoneNumber: doctor.phonenumber,
      Email: doctor.email,
      Password: doctor.Password,
      ConfirmPassword: doctor.ConfirmPassword,
      Age: doctor.age,
      Gender: doctor.gender,
      DepartmentId: doctor.departmentid,
      Experience: doctor.experience,
      CityId: doctor.cityid,
      AreaId: doctor.areaid,
      Role: parseInt(doctor.role, 10),
    });

    axios
      .post(
        "https://localhost:7127/api/user/user-Create",
        {
          FirstName: doctor.FirstName,
          LastName: doctor.LastName,
          PhoneNumber: doctor.phonenumber,
          Email: doctor.email,
          Password: doctor.Password,
          ConfirmPassword: doctor.ConfirmPassword,
          Age: doctor.age,
          Gender: doctor.gender,
          DepartmentId: doctor.departmentid,
          Experience: doctor.experience,
          CityId: doctor.cityid,
          AreaId: doctor.areaid,
          Role: parseInt(doctor.role, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(t("Success:"), response.data);
      })
      .catch((error) => {
        console.error(t("Error:"), error.response?.data || error.message);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-white bg-primary py-3 rounded-top">
              {t('Add New Doctor')} 
           </h2>
            <form onSubmit={handleSubmit}>
              {/* First Name and Last Name Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="FirstName" className="form-label">
                    {t("First Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="FirstName"
                    name="FirstName"
                    value={doctor.FirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="LastName" className="form-label">
                    {t("Last Name")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="LastName"
                    name="LastName"
                    value={doctor.LastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password and Confirm Password Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="Password" className="form-label">
                    {t("Password")}
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="Password"
                    name="Password"
                    value={doctor.Password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="ConfirmPassword" className="form-label">
                    {t("Confirm Password")}
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    value={doctor.ConfirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Age Field */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="age" className="form-label">
                    {t("Age")}
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="age"
                    name="age"
                    value={doctor.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="120"
                  />
                </div>
              </div>

              {/* Hire Date and Department Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="department" className="form-label">
                    {t("Department")}
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="departmentid"
                    name="departmentid"
                    value={doctor.departmentid}
                    onChange={handleChange}
                    required
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Experience and Other Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="experience" className="form-label">
                    {t("Experience")}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="experience"
                    name="experience"
                    value={doctor.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Phone and Email Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="phonenumber" className="form-label">
                    {t("Phone")}
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    id="phonenumber"
                    name="phonenumber"
                    value={doctor.phonenumber}
                    onChange={handleChange}
                    required
                    pattern="^0[7]\d{8}$"
                    title="Phone number must be in the Jordanian format (e.g., 079xxxxxxxx)"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    {t("Email")}
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={doctor.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Gender Fields */}
              <div className="row mb-3">
                <label className="form-label">{t("Gender")}</label>
                <div
                  className="form-check"
                  style={{ display: "flex", gap: "20px" }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="1" // 1 for Male
                      checked={doctor.gender === 1}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="male">
                      {t("Male")}
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="2" // 2 for Female
                      checked={doctor.gender === 2}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="female">
                      {t("Female")}
                    </label>
                  </div>
                </div>
              </div>

              {/* Area and City Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="cityid" className="form-label">
                    {t("City")}
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="cityid"
                    name="cityid"
                    value={doctor.cityid}
                    onChange={handleCityChange} // Update cities based on this change
                    required
                  >
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="areaid" className="form-label">
                    {t("Area")}
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="areaid"
                    name="areaid"
                    value={doctor.areaid}
                    onChange={handleChange}
                    required
                  >
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Role Field */}
              <div className="row mb-3">
                <label htmlFor="role" className="form-label">
                  {t("Position")}
                </label>
                <select
                  className="form-select form-select-lg"
                  id="role"
                  name="role"
                  value={doctor.role}
                  onChange={handleChange}
                  required
                  disabled
                >
                  <option value="1">{t("Doctor")}</option>
                  <option value="2">{t("Pharmacist")}</option>
                  <option value="3">{t("Nurse")}</option>
                  <option value="4">{t("Management Staff")}</option>
                </select>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  {t("Add Doctor")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
