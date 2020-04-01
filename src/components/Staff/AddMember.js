import React from "react";
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

export class AddMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.prepareModal = this.prepareModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  prepareModal() {
    this.setState({
      showModal: true
    });
  }

  render() {
    return (
      <>
        {
          this.state.showModal
            ? <BuzzModal
              submitFunc={postMember}
              closeModal={this.closeModal}
              isOpen={this.state.showModal}
              item={modalItem}
            />
            : null
        }
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.5em 2em"
        }}>
          <button onClick={this.prepareModal}>+ Add Member</button>
        </div>
      </>
    )
  }
}