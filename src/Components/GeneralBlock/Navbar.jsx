import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
export default function NavBar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Switch language
  };
   
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#1F316F" }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <span className="fs-5 fw-bold">Path2Health</span>
        </NavLink>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                {t('Home')}
              </NavLink>
            </li>

            {[
              {
                name: t("Doctor"),
                links: [
                  { label:t( "Display Doctors"), path: "/doctors" },
                  { label: t("Add Doctor"), path: "/create-doctor" },
                ],
              },
              {
                name: t("Drugs"),
                links: [
                  { label: t("Drug Warehouse"), path: "/drugs" },
                  { label: t("Warehouse Orders"), path: "/drug-orders" },
                  { label: t("Order Drugs"), path: "/order-drug" },
                ],
              },
              {
                name:t( "Nurse"),
                links: [
                  { label: t("Display Nurses"), path: "/nurses" },
                  { label: t("Add Nurse"), path: "/create-nurse" },
                ],
              },
              {
                name: t("Patient"),
                links: [
                  { label: t("Display Patients"), path: "/patients" },
                  { label: t("Add Patient"), path: "/create-patient" },
                ],
              },
              {
                name: t("Management Staff"),
                links: [
                  { label: t("Display Management Staff"), path: "/staff" },
                  { label: t("Add Management Staff"), path: "/create-staff" },
                ],
              },
              {
                name: t("Pharmacist"),
                links: [
                  { label: t("Display Pharmacists"), path: "/pharmacists" },
                  { label: t("Add Pharmacist"), path: "/create-pharmacist" },
                ],
              },
            ].map((menu, index) => (
              <li key={index} className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id={`${menu.name}Dropdown`}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {menu.name}
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby={`${menu.name}Dropdown`}>
                  {menu.links.map((link, idx) => (
                    <li key={idx}>
                      <NavLink className="dropdown-item" to={link.path}>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Profile and login section */}
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile Placeholder"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="text-light me-3">John Doe</span>
            <NavLink className="btn btn-outline-light btn-sm" to="/login">
              {t("Login")}
            </NavLink>
      <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🌐
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => changeLanguage("en")}
                  >
                    <img
  src="https://flagcdn.com/w40/gb.png"
  alt="UK Flag"
  style={{ width: "20px", marginRight: "10px" }}
/>
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => changeLanguage("ar")}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg"
                      alt="Jordan Flag"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    العربية
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
