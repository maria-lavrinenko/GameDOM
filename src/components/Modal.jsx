import React from "react";
import "./Modal.css";
import SignUpForm from "./SignUpForm";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="darkBG" />
      <div className="centered">
        <div className="modalContent">
          <SignUpForm setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
};

export default Modal;
