import React, { useState } from "react";
import { BuzzModal } from "../Shared/Modal";
import { postMember } from "../../services/api";

const modalItem = {
  slug: "",
  firstName: "",
  lastName: "",
  twitter: "",
  position: "",
  multimedia: {
    type: "radio"
  },
  initials: "",
};

export const AddMember = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const prepareModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <BuzzModal
          submitFunc={postMember}
          closeModal={closeModal}
          isOpen={showModal}
          item={modalItem}
        />
      )}
      <div style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: "2em 0em"
      }}>
        <button 
          style={{
            background: "#FFE082",
            border: "0.15em solid black",
            borderRadius: "0.8em",
            color: "black",
            fontWeight: "600",
            fontSize: "1em",
            padding: "0.7em 1.4em 0.7em 1.4em"
          }}
          onClick={prepareModal}
          >
            + Add Member
          </button>
      </div>
    </>
  );
};