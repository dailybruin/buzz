// src/components/Staff/EditMember.jsx
import React from "react";
import ReactDOM from "react-dom";
import { EditMemberForm } from "./EditMemberForm";
import "../Shared/Modal.css";  // shared modal styles

export function EditMember({
  member,
  formValues,
  onChange,
  onCancel,
  onSubmit
}) {
  // Render the form into a portal so it appears as a modal
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <EditMemberForm
          member={member}
          formValues={formValues}
          onChange={onChange}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </div>,
    document.body
  );
}
