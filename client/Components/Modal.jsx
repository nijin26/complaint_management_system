import React from "react";

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center z-10`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="fixed z-20">
        <div className="bg-white rounded-md p-6 z-50">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
