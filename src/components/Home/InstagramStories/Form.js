import React, { useState } from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postStory } from '../../../services/api';

const StoryForm = ({ date, properties }) => {
  const [open, setOpen] = useState(false);

  const submitStory = (values) => {
    return postStory(date, values);
  };

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          border: "3px solid black",
          width: "fit-content",
          padding: "10px",
          backgroundColor: "rgb(255, 224, 130)",
          borderRadius: "7px",
          marginTop: "30px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <div style={{ fontWeight: 600, padding: "0 20px" }}>
          {open ? "Close Form" : "+ Add Item"}
        </div>
      </div>

      <AnimateHeight key={open ? "open" : "closed"} height={open ? "auto" : 0} duration={500}>
        {open && (
          <div style={{ border: "1px solid black", padding: "1.5em 1em", marginBottom: "70px" }}>
            <Formik
              initialValues={properties.reduce((acc, prop) => ({ ...acc, [prop]: "" }), {})}
              onSubmit={async (values, { setSubmitting }) => {
                submitStory(values).then(({ status }) => {
                  if (status < 400) {
                    window.location.reload();
                  }
                });
              }}
            >
              {({ isSubmitting }) => (
                <FormikForm>
                  {properties.map((field) => (
                    <div key={field}>
                      <label htmlFor={field}>{field}:{' '}</label>
                      <Field type="text" name={field} />
                      <ErrorMessage name={field} component="div" />
                    </div>
                  ))}
                  <button className="primary" type="submit" disabled={isSubmitting}>
                    <span className="semibold">+</span> Create
                  </button>
                </FormikForm>
              )}
            </Formik>
          </div>
        )}
      </AnimateHeight>
    </div>
  );
};

export default StoryForm;
