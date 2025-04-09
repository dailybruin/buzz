import React from "react";
import { FaTimes } from "react-icons/fa";
import "../Shared/Modal.css";  

export function EditMemberForm({
  member,
  formValues,
  onChange,
  onCancel,
  onSubmit
}) {
  return (
    <div className="edit-member-card">

      <div className="edit-member-header">
        <h2>Edit Member Info</h2>
        <button
          type="button"
          className="edit-member-close"
          onClick={onCancel}
        >
          <FaTimes />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        {/* Two‑column grid */}
        <div className="modal-form-grid">
          <input
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={onChange}
            className="modal-input"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={onChange}
            className="modal-input"
          />

          <input
            name="initials"
            placeholder="Initials"
            value={formValues.initials}
            onChange={onChange}
            className="modal-input"
          />
          <input
            name="position"
            placeholder="Position"
            value={formValues.position}
            onChange={onChange}
            className="modal-input"
          />

          <input
            name="twitter"
            placeholder="Twitter"
            value={formValues.twitter}
            onChange={onChange}
            className="modal-input"
          />
          <input
            name="slug"
            placeholder="Slug"
            value={member.slug}
            readOnly
            className="modal-input modal-input-readonly"
          />

          <div className="modal-checkbox-container">
            <label className="modal-checkbox-label">
              <input
                type="checkbox"
                name="multimedia"
                checked={formValues.multimedia}
                onChange={onChange}
                className="modal-checkbox"
              />
              Multimedia
            </label>
          </div>
        </div>

        <div className="modal-action-buttons">
          <button type="submit" className="modal-submit-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
