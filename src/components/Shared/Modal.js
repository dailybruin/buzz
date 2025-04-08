import React from "react";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import "./Modal.css";

Modal.setAppElement("#root");

export class BuzzModal extends React.Component {
  render() {
    const {
      isOpen,
      closeModal,
      submitFunc,
      item,
      label = "New Member Info",
      submitLabel = "+ Add Member"
    } = this.props;

    const textFields = [
      "firstName",
      "lastName",
      "initials",
      "slug",
      "position",
      "twitter"
    ];
    const checkboxFields = ["multimedia"];

    const initialValues = {
      ...textFields.reduce((acc, k) => ({ ...acc, [k]: item[k] || "" }), {}),
      ...checkboxFields.reduce((acc, k) => ({ ...acc, [k]: !!item[k].default }), {})
    };

    const humanize = s =>
      s[0].toUpperCase() +
      s
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim();

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={label}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div className="modal-header">
          <h2 className="modal-title">{label}</h2>
          <button
            type="button"
            className="modal-header-icon"
            onClick={closeModal}
          >
            <FaPlus />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            submitFunc(values).then(({ status }) => {
              if (status < 400) {
                closeModal();
                window.location.reload();
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              <div className="modal-form-grid">
                {textFields.map(key => (
                  <div key={key} className="modal-form-field">
                    <Field
                      name={key}
                      placeholder={humanize(key)}
                      className="modal-input"
                    />
                    <ErrorMessage
                      name={key}
                      component="div"
                      className="modal-error"
                    />
                  </div>
                ))}

                <div className="modal-checkbox-container">
                  <label className="modal-checkbox-label">
                    <Field
                      type="checkbox"
                      name="multimedia"
                      className="modal-checkbox"
                    />
                    Multimedia
                  </label>
                </div>
              </div>

              <div className="modal-action-buttons">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="modal-submit-button"
                >
                  {submitLabel}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    );
  }
}
