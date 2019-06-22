import React from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postDesignNote } from '../../../services/api';
import config from "../../../config";

export class DesignNotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.submitNote = this.submitNote.bind(this);
  }

  submitNote(values) {
    const req = Object.assign({}, values, { "section": this.props.section });
    return postDesignNote(this.props.date, req);
  }

  render() {
    return (
      <div>
        <div onClick={() => this.setState({ open: !this.state.open })}>
          <p><u>{this.state.open ? "Close Form" : "Open Form"}</u></p>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div style={{
            border: "1px solid black",
            padding: "1.5em 1em"
          }}>
            <Formik
              initialValues={this.props.properties.reduce((acc, curr, index) => {
                acc[curr] = "";
                return acc;
              }, {})}
              onSubmit={(values, actions) => {
                this.submitNote(values).then(({ data, status}) => {
                  if (status < 400) {
                    if (window) {
                      window.location.reload();
                    }
                  }
                })
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <FormikForm>
                  {this.props.properties.map(f => (
                    <div key={f}>
                      <label htmlFor={f}>{f}:{' '}</label>
                      <Field
                        type="text"
                        name={f}
                        placeholder={config.designNotes.placeholders[f] || null}
                      />
                      <ErrorMessage name={f} component="div" />
                    </div>
                  ))}
                  {status && status.msg && <div>{status.msg}</div>}
                  <button className="primary" type="submit" disabled={isSubmitting}>
                    <span className="semibold">+</span> Create
                  </button>
                </FormikForm>
              )}
            />
          </div>
        </AnimateHeight>
      </div>
    )
  }
}