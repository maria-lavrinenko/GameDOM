import React from "react";
import "./Modal.css";
import SignUpForm from "./SignUpForm";

const Modal = ({ setIsOpen, outline, setOutline }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="darkBG">
        <div className="centered">
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>
              Maybe later
            </button>
            <div className="modalContent" style={{ outline }}>
              <SignUpForm setIsOpen={setIsOpen} setOutline={setOutline} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
