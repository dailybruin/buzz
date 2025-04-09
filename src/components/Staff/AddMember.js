import React from "react";
import { BuzzModal } from "../Shared/Modal";
import { postMember } from "../../services/api";
import "../Shared/Modal.css";  

const modalItem = {
  slug: "",
  firstName: "",
  lastName: "",
  twitter: "",
  position: "",
  multimedia: { type: "radio" },
  initials: ""
};

export class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  render() {
    const { showModal } = this.state;

    return (
      <>
        <BuzzModal
          isOpen={showModal}
          closeModal={() => this.setState({ showModal: false })}
          submitFunc={postMember}
          item={modalItem}
          label="New Member Info"
          submitLabel="+ Add Member"
          submitButtonClass="modal-submit-button"   
        />

        <div className="modal-trigger-container">
          <button
            className="modal-trigger-button"
            onClick={() => this.setState({ showModal: true })}
          >
            + Add Member
          </button>
        </div>
      </>
    );
  }
}

