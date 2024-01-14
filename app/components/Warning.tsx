import React from "react";

interface WarningProps {
  closeModal: () => void;
  title: string;
  text: string;
}
export default function Warning({ closeModal, title, text }: WarningProps) {
  return (
    <dialog id="my_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{text}</p>
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>
  );
}
