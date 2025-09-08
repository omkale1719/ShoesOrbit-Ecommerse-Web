import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "60%",
  width: "55%",
  background: "linear-gradient(135deg, #0c0c0dff, #333334ff)",
  color: "#fff",
  borderRadius: "18px",
  boxShadow: "0 20px 50px rgba(74, 71, 71, 0.6)",
  padding: "1.5rem",
  animation: "modalShow 0.4s ease-out",
  overflowY: "auto",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(5px)",
  zIndex: 999,
  animation: "fadeIn 0.4s ease",
};


export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      {/* ✅ Inline <style> tag must be inside JSX */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalShow {
            from { 
              opacity: 0; 
              transform: translate(-50%, -40%) scale(0.8);
            }
            to { 
              opacity: 1; 
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>

      <div style={OVERLAY_STYLES} />
      <div className="container">
        <div style={MODAL_STYLES}>
          <button
            className="btn bg-danger rounded-circle fs-4"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
