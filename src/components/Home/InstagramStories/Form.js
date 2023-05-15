import React from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postStory } from '../../../services/api';
import config from "../../../config";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./style.css";

export class StoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFields: {},
    };
    this.submitStory = this.submitStory.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event) {
    const tag = event.target.id
    let oldFields = this.state.textFields;
    oldFields[tag] = event.target.value;
    this.setState({ textFields: oldFields });
  }

  submitStory(values) {
    return postStory(this.props.date, values);
  }

  render() {
    return (
      <div>
        <div onClick={() => this.setState({ open: !this.state.open })}>
          <p><u>{this.state.open ? "Close Form" : "Open Form"}</u></p>
        </div>
        <AnimateHeight height={this.state.open ? "auto" : 0}>
          <div>
            <Formik
              initialValues={this.props.properties.reduce((acc, curr, index) => {
                acc[curr] = "";
                return acc;
              }, {})}
              onSubmit={(values, actions) => {
                this.submitStory(values).then(({ data, status }) => {
                  if (status < 400) {
                    if (window) {
                      window.location.reload();
                    }
                  }
                })
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <FormikForm className='instagram-stories-form' style={{ paddingLeft: 100, paddingRight: 100 }}>
                  {this.props.properties.map((f) => {
                    return (
                      <div key={f} htmlFor={f}>
                        <TextField
                          className="home-text-field"
                          variant="standard"
                          label={f}
                          type="text"
                          name={f}
                          onChange={this.handleTextChange}
                          placeholder={null}
                          multiline
                          fullWidth
                          id={f}
                        />
                        <ErrorMessage name={f} component="div" />
                      </div>
                    )
                  })}
                  {status && status.msg && <div>{status.msg}</div>}
                  <Button className="create-button" variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{
                    mt: 2, fontWeight: 'bold', color: 'white', backgroundColor: 'black',
                  }}>
                    Create
                  </Button>
                </FormikForm>
              )}
            />
          </div>
        </AnimateHeight>
      </div>
    )
  }
}