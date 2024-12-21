import { useEffect, useState } from "react";

// Declare fixed messages
const msgs = {
  success: "Operation Completed Successfully!",
  error: "An Error Occurred, Please Try Again.",
  warning: "WARNING! CHECK YOUR INPUT.",
  info: "This is an Informative Message.",
};

const ToastMessage = ({ type ,message}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    if (type && msgs[type]) {
      setIsVisible(true);
      setTimestamp(new Date().toLocaleTimeString());

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 15000); // 15 seconds auto-close

      return () => clearTimeout(timer);
    }
  }, [type]);

  const toastClass =
    {
      success: "bg-success text-white",
      error: "bg-danger text-white",
      warning: "bg-warning text-dark",
      info: "bg-info text-white",
    }[type] || "bg-secondary text-white";

  if (!isVisible) return null;

  return (
    <div
      className={`toast position-fixed bottom-0 end-0 m-3 show`}
      style={{ zIndex: 1055 }}
    >
      <div className={`toast-header ${toastClass}`}>
        <strong className="me-auto">Message</strong>
        <small>{timestamp}</small>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setIsVisible(false)}
        ></button>
      </div>
      <div className="toast-body">{message || msgs[type]}</div>
    </div>
  );
};

export default ToastMessage;
