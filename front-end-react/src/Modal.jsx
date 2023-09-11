import React from 'react';
import './Modal.css';
;
function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Fond foncé derrière la modal */}
      <div className="modal-background" onClick={onClose}>
        {/* Contenu de la modal */}
        <div className="modal-content">
          <h2>Employee Created!</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Modal;