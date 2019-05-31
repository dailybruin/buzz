import React from "react";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import Modal from "react-modal";

export class BuzzModal extends React.Component {
  render() {
    const data = Object.keys(this.props.item);

    return (
      <Modal onRequestClose={this.props.closeModal} isOpen={this.props.isOpen} contentLabel={this.props.label || "Edit"}>
        <Formik
          initialValues={this.props.item}
          onSubmit={(values, actions) => {
            this.props.submitFunc(values).then(({ data, status }) => {
              if (status < 400) {
                if (window) {
                  window.location.reload();
                }
              }
            })
          }}
          render={({ errors, handleChange, status, touched, values, isSubmitting }) => {
            return (
            <FormikForm>
              {data.map(f => (
                <div key={f}>
                  <label htmlFor={f}>{f}:{' '}</label>
                  <Field
                    type="text"
                    name={f}
                  />
                  <ErrorMessage name={f} component="div" />
                </div>
              ))}
              {status && status.msg && <div>{status.msg}</div>}
              <button className="customSubmitButton" type="submit" disabled={isSubmitting}>
                <span className="semibold">+</span> Create
                  </button>
            </FormikForm>);
          }}
        />
      </Modal>
    );
  }
}