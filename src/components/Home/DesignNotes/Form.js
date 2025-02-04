import React, { useState, useEffect } from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postDesignNote } from '../../../services/api';
import config from "../../../config";

/*NOTE: Art in is not default value*/

export const DesignNotesForm = ( {date, section, properties } ) => {
  const [open, setOpen] = useState(false);

  const submitNote = (values) => {
    const req = { ...values, section };
    return postDesignNote(date, req);
  };

  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        <p><u>{open ? "Close Form" : "Open Form"}</u></p>
      </div>
      <AnimateHeight height={open ? "auto" : 0}>
        <div style={{
          border: "1px solid black",
          padding: "1.5em 1em"
        }}>
          <Formik
            initialValues={properties.reduce((acc, curr, index) => {
              acc[curr] = "";
              return acc;
            }, {})}
            onSubmit={(values, actions) => {
              submitNote(values).then(({ data, status }) => {
                if (status < 400) {
                  if (window) {
                    window.location.reload();
                  }
                }
              });
            }}
          >
            {({ errors, status, touched, isSubmitting }) => (
              <FormikForm>
                {properties.map((f) => {
                  if (f === "artStatus") {
                    return (
                      <div key={f}>
                        <label htmlFor={f}>{f}:{' '}</label>
                        <Field
                          component="select"
                          name={f}
                        >
                          <option value="Art In">Art In</option>
                          <option value="Photo edited, no Camayak">Photo edited, no Camayak</option>
                          <option value="Waiting for courtesies">Waiting for courtesies</option>
                        </Field>
                        <ErrorMessage name={f} component="div" />
                      </div>
                    )
                  } else {
                    return (
                      <div key={f}>
                            <label htmlFor={f}>{f}:{' '}</label>
                            <Field
                              type="text"
                              name={f}
                              placeholder={config.designNotes.placeholders[f] || null}
                            />
                            <ErrorMessage name={f} component="div" />
                      </div>
                    );
                  }
                })}
                {status && status.msg && <div>{status.msg}</div>}
                <button className="primary" type="submit" disabled={isSubmitting}>
                  <span className="semibold">+</span> Create
                </button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </AnimateHeight>
    </div>
  );
};
