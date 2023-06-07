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
      textFields: {},
    };
    this.submitNote = this.submitNote.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  submitNote(values) {
    const req = Object.assign({}, this.state.textFields, { "section": this.props.section });
    return postDesignNote(this.props.date, req);
  }

  handleStatusChange(event) {
    let oldFields = this.state.textFields;
    oldFields['artStatus'] = event.target.value
    this.setState({ textFields: oldFields });
  }

  handleTextChange(event) {
    const tag = event.target.id
    let oldFields = this.state.textFields;
    oldFields[tag] = event.target.value;
    this.setState({ textFields: oldFields });
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
                this.submitNote(values).then(({ data, status }) => {
                  if (status < 400) {
                    if (window) {
                      window.location.reload();
                    }
                  }
                })
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <FormikForm className="design-notes-form" style={{ paddingLeft: 100, paddingRight: 100 }}>
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
                                onChange={this.handleStatusChange}
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
                            onChange={this.handleTextChange}
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
