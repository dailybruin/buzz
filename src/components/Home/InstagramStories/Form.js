import React from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postStory } from '../../../services/api';
import config from "../../../config";

export class StoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.submitStory = this.submitStory.bind(this);
  }

  submitStory(values) {
    return postStory(this.props.date, values);
  }

  render() {
    return (
      <div>
        <div onClick={() => this.setState({ open: !this.state.open })} style={{
          border: "3px solid black",
          width: "fit-content",
          padding: "10px",
          backgroundColor: "rgb(255, 224, 130)",
          borderRadius: "7px",
          marginTop: "30px",
          marginBottom: "20px",
        }}>
          <div style={{
            fontWeight: 600,
            paddingLeft: "20px",
            paddingRight: "20px",
          }}>{this.state.open ? "Close Form" : "+ Add Item"}</div>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div style={{
            border: "1px solid black",
            padding: "1.5em 1em",
            marginBottom: "70px",
          }}>
            <Formik
              initialValues={this.props.properties.reduce((acc, curr, index) => {
                acc[curr] = "";
                return acc;
              }, {})}
              onSubmit={(values, actions) => {
                this.submitStory(values).then(({ data, status }) => {
                  console.log(data)
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