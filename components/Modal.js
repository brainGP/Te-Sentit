import React, { useEffect, useRef } from "react";

const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleBackgroundClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-lg max-w-lg max-h-full overflow-auto relative transition-transform duration-300 transform scale-95 hover:scale-100">
        <button
          className="absolute top-0 right-0 m-2 text-2xl text-black hover:text-gray-700"
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
