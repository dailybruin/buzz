import React, { useState, useEffect } from 'react';
import AnimateHeight from "react-animate-height";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { postDesignNote } from '../../../services/api';
import { patchDesignNote } from '../../../services/api';
import config from "../../../config";
import './DesignNotesForm.css';


/*NOTE: Art in is not default value*/

export const DesignNotesForm = ( {date, section, properties, initialValues } ) => {

  const [open, setOpen] = useState(initialValues ? true : false); // auto-open if editing

  const isEditing = !!initialValues;

  const submitNote = (values) => {
    const req = { ...values, section };
    return postDesignNote(date, req);
  };

  const submitExistingNote = (values) => {
    const req = { ...values, section }; 
    return patchDesignNote(initialValues._id)(req);
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
          cursor: "pointer"
        }}
      >
        <div style={{
          fontWeight: 600,
          paddingLeft: "20px",
          paddingRight: "20px",
        }}>
          {open ? "Close Form" : "+ Add Item"} 
        </div>
      </div>

      <AnimateHeight key={open ? "open" : "closed"} height={open ? "auto" : 0} duration={500}>
        {open && (
        <div style={{
          // border: "1px solid black",
          padding: "1.5em 1em"
        }}>
          <Formik
            initialValues={initialValues || properties.reduce((acc, curr) => ({ ...acc, [curr]: "" }), {})}
            onSubmit={(values, actions) => {
              const submitFunc = initialValues
              ? submitExistingNote
              : submitNote;

            submitFunc(values).then(({ data, status }) => {
              if (status < 400 && window) {
                window.location.reload();
              }
            });
            }
          }
          >
            {({ errors, status, touched, isSubmitting }) => (
              // <FormikForm style={{
              //   background: "#fff8dc",
              //   // maxWidth: "100%",
              //   margin: "auto",
              //   padding: "2rem",
              //   borderRadius: "12px",
              //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              // }}>
              //   <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              //     New Member Info
              //   </h2>

              //   {/* Grid Layout */}
              //   <div style={{
              //     display: "grid",
              //     gridTemplateColumns: "1fr 1fr",
              //     gap: "20px",
              //   }}>
              //     {properties.map((f) => (
              //       <div key={f} style={{ display: "flex", flexDirection: "column" }}>
              //         <label htmlFor={f} style={{
              //           fontWeight: "500",
              //           marginBottom: "5px",
              //           color: "#333",
              //         }}>
              //           {f.replace(/([A-Z])/g, " $1").trim()}
              //         </label>

              //         {f === "artStatus" ? (
              //           <Field
              //             component="select"
              //             name={f}
              //             style={{
              //               width: "100%",
              //               border: "2px solid #333",
              //               borderRadius: "8px",
              //               padding: "5px",
              //               background: "#FFE082",
              //               fontSize: "1rem",
              //               outline: "none",
              //             }}
              //           >
              //             <option value="Art In">Art In</option>
              //             <option value="Photo edited, no Camayak">Photo edited, no Camayak</option>
              //             <option value="Waiting for courtesies">Waiting for courtesies</option>
              //           </Field>
              //         ) : (
              //           <Field
              //             type="text"
              //             name={f}
              //             placeholder={config.designNotes.placeholders[f] || ""}
              //             style={{
              //               width: "100%",
              //               border: "none",
              //               borderBottom: "2px solid #333",
              //               padding: "5px",
              //               background: "transparent",
              //               fontSize: "1rem",
              //               outline: "none",
              //             }}
              //           />
              //         )}
              //         <ErrorMessage name={f} component="div" style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }} />
              //       </div>
              //     ))}
              //   </div>
              //   {/* Submit Button */}
              //   <button
              //     type="submit"
              //     disabled={isSubmitting}
              //     style={{
              //       marginTop: "1.5rem",
              //       padding: "10px 20px",
              //       background: "#FFE082",
              //       color: "#000",
              //       fontWeight: "bold",
              //       border: "2px solid black",
              //       borderRadius: "8px",
              //       cursor: "pointer",
              //       transition: "0.3s",
              //     }}
              //     onMouseOver={(e) => e.target.style.background = "#f4c430"}
              //     onMouseOut={(e) => e.target.style.background = "#ffd700"}
              //   >
              //     Submit
              //   </button>
              // </FormikForm>
              <FormikForm className="design-form-container">
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
              New Member Info
            </h2>

            <div className="design-form-grid">
              {properties.map((f) => (
                <div key={f} className="design-form-grid-item">
                  <label htmlFor={f} className="design-form-label">
                    {f.replace(/([A-Z])/g, " $1").trim()}
                  </label>

                  {f === "artStatus" ? (
                    <Field as="select" name={f} className="design-form-select">
                      <option value="Art In">Art In</option>
                      <option value="Photo edited, no Camayak">Photo edited, no Camayak</option>
                      <option value="Waiting for courtesies">Waiting for courtesies</option>
                    </Field>
                  ) : (
                    <Field
                      type="text"
                      name={f}
                      placeholder={config.designNotes.placeholders[f] || ""}
                      className="design-form-input design-form-textinput"
                    />
                  )}
                  <ErrorMessage
                    name={f}
                    component="div"
                    style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={isSubmitting} className="design-form-button">
              Submit
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