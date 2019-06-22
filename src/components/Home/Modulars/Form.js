import React from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postModular } from '../../../services/api';

export class ModularForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.submitModular = this.submitModular.bind(this);
  }

  submitModular(values) {
    return postModular(this.props.category, this.props.date, values);
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
              initialValues={this.props.fields.reduce((acc, curr, index) => {
                acc[curr] = "";
                return acc;
              }, {})}
              onSubmit={(values, { setSubmitting }) => {
                this.submitModular(values).then(({ data, status }) => {
                  if (status < 400) {
                    if (window) {
                      window.location.reload();
                    }
                  }
                })
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <FormikForm>
                    {this.props.fields.map(f => (
                      <div key={f}>
                        <label htmlFor={f}>{f}:{' '}</label>
                        <Field 
                          type="text" 
                          component="textarea"
                          name={f}
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