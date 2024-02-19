import React, { useEffect, useRef } from "react";
import "./modal.css"; // Adjust based on your file structure, respecting case sensitivity.

const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // Ensure body overflow is reset when component unmounts
    };
  }, [show, onClose]);

  const handleBackgroundClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`modal-background ${show ? "show" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div className="modal-content">
        <button
          className="close-button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
