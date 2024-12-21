import React from "react";

export default function SpinnerLoading({ message = "Loading, please wait..." }) {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }} // Optional background color
    >
      {/* Bootstrap Spinner */}
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Optional Loading Message */}
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
