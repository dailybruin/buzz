import React from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postDesignNote } from '../../../services/api';
import config from "../../../config";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./style.css";

export class DesignNotesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      artStatus: '',
    };
    this.submitNote = this.submitNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitNote(values) {
    const req = Object.assign({}, values, { "section": this.props.section });
    return postDesignNote(this.props.date, req);
  }

  handleChange(event) {
    this.setState({ artStatus: event.target.value });
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
                this.submitNote(values).then(({ data, status }) => {
                  if (status < 400) {
                    if (window) {
                      window.location.reload();
                    }
                  }
                })
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <FormikForm className="design-notes-form">
                  {this.props.properties.map((f) => {
                    if (f === "artStatus") {
                      return (
                        <div key={f}>
                          <Box sx={{ minWidth: 240, mt: 3 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-standard-label" htmlFor={f}>Art Status</InputLabel>
                              <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Art Status"
                                value={this.state.artStatus}
                                onChange={this.handleChange}
                                inputProps={{
                                  name: "artStatus",
                                  id: "artStatus",
                                }}
                              >
                                <MenuItem value={'Art In'}>Art In</MenuItem>
                                <MenuItem value={'Photo edited, no Camayak'}>Photo edited, no Camayak</MenuItem>
                                <MenuItem value={'Waiting for courtesies'}>Waiting for courtesies</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <ErrorMessage name={f} component="div" />
                        </div>
                      )
                    } else {
                      return (
                        <div key={f} htmlFor={f}>
                          <TextField
                            className="home-text-field"
                            variant="standard"
                            label={f}
                            type="text"
                            name={f}
                            placeholder={config.designNotes.placeholders[f] || null}
                            multiline
                            fullWidth
                            id={f}
                          />
                          <ErrorMessage name={f} component="div" />
                        </div>
                      )
                    }
                  })}
                  {status && status.msg && <div>{status.msg}</div>}
                  <Button className="create-button" variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{ mt: 2 }}>
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
