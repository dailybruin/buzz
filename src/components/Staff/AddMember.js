// import React from "react";
// import { BuzzModal } from "../Shared/Modal";
// import { postMember } from "../../services/api";

// const modalItem = {
//   slug: "",
//   firstName: "",
//   lastName: "",
//   twitter: "",
//   position: "",
//   multimedia: {
//     type: "radio"
//   },
//   initials: "",
// };

// export class AddMember extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false
//     };
//     this.closeModal = this.closeModal.bind(this);
//     this.prepareModal = this.prepareModal.bind(this);
//   }

//   closeModal() {
//     this.setState({ showModal: false });
//   }

//   prepareModal() {
//     this.setState({
//       showModal: true
//     });
//   }

//   render() {
//     return (
//       <>
//         {
//           this.state.showModal
//             ? <BuzzModal
//               submitFunc={postMember}
//               closeModal={this.closeModal}
//               isOpen={this.state.showModal}
//               item={modalItem}
//             />
//             : null
//         }
//         <div style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           padding: "0.5em 2em"
//         }}>
//           <button onClick={this.prepareModal}>+ Add Member</button>
//         </div>
//       </>
//     )
//   }
// }


// src/components/Staff/AddMember.js
// import React from "react";
// import { BuzzModal } from "../Shared/Modal";
// import { postMember } from "../../services/api";

// const modalItem = {
//   slug: "",
//   firstName: "",
//   lastName: "",
//   twitter: "",
//   position: "",
//   multimedia: { type: "radio" },
//   initials: ""
// };

// export class AddMember extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { showModal: false };
//   }

//   render() {
//     const { showModal } = this.state;

//     return (
//       <>
//         {/* Always render the modal; control visibility via isOpen */}
//         <BuzzModal
//           isOpen={showModal}
//           closeModal={() => this.setState({ showModal: false })}
//           submitFunc={postMember}
//           item={modalItem}
//           label="New Member Info"
//           submitLabel="+ Add Member"
//         />

//         {/* Trigger button */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-start",
//             padding: "2em 0.5em"
//           }}
//         >
//           <button
//             onClick={() => this.setState({ showModal: true })}
//             style={{
//               backgroundColor: "#FCD77F",              // a bit richer yellow
//               color: "#000",                            // ensure the text is black
//               border: "2px solid #000",                 // thicker black border
//               borderRadius: "8px",      
//               padding: "0.75rem 1.5rem",
//               fontSize: "1rem",
//               fontWeight: "bold",
//               cursor: "pointer"
//             }}
//           >
//             + Add Member
//           </button>
//         </div>
//       </>
//     );
//   }
// }

// src/components/Staff/AddMember.jsx
import React from "react";
import { BuzzModal } from "../Shared/Modal";
import { postMember } from "../../services/api";
import "../Shared/Modal.css";  // import the shared styles

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
          submitButtonClass="modal-submit-button"   // pass the class to the modal
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

