// import React from "react";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
// import Modal from "react-modal";

// const Checkbox = ({
//   field: { name, value, onChange, onBlur },
//   form: { errors, touched, setFieldValue },
//   id,
//   className,
//   ...props
// }) => {
//   return (
//       <input
//         name={name}
//         id={id}
//         type="checkbox"
//         value={value}
//         checked={value}
//         onChange={onChange}
//         onBlur={onBlur}
//       />
//   );
// };

// export class BuzzModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.renderObjectItem = this.renderObjectItem.bind(this);
//   }

//   renderObjectItem(key) {
//     const item = this.props.item[key];

//     if (item.type === "radio") {
//       return (<div key={key}>
//         <label htmlFor={key}>{key}:{' '}</label>
//         <Field component={Checkbox} name={key} id={key} />
//         <ErrorMessage name={key} component="div" />
//       </div>
//       )}
//   }

//   render() {
//     const data = Object.keys(this.props.item);
//     const initialValues = data.reduce((acc, curr, index) => {
//       if (typeof this.props.item[curr] !== "object") {
//         acc[curr] = this.props.item[curr];
//       } else {
//         if (this.props.item[curr].type === "radio") {
//           acc[curr] = this.props.item[curr].default ? this.props.item[curr].default : false;
//         }
//       }
//       return acc;
//     }, {});

//     return (
//       <Modal onRequestClose={this.props.closeModal} isOpen={this.props.isOpen} contentLabel={this.props.label || "Edit"}>
//         <Formik
//           initialValues={initialValues}
//           onSubmit={(values, actions) => {
//             this.props.submitFunc(values).then(({ data, status }) => {
//               if (status < 400) {
//                 if (window) {
//                   window.location.reload();
//                 }
//               }
//             })
//           }}
//           render={({ errors, handleChange, status, touched, values, isSubmitting }) => {
//             return (
//             <FormikForm>
//               {data.map(f => {
//                 if (typeof this.props.item[f] !== "object") {
//                   return (
//                     <div key={f}>
//                       <label htmlFor={f}>{f}:{' '}</label>
//                       <Field
//                         type="text"
//                         name={f}
//                       />
//                       <ErrorMessage name={f} component="div" />
//                     </div>
//                   )
//                 }
//                 return this.renderObjectItem(f);
//                 })}
//               {status && status.msg && <div>{status.msg}</div>}
//               <button className="primary" type="submit" disabled={isSubmitting}>
//                 <span className="semibold">+</span> Create
//                   </button>
//             </FormikForm>);
//           }}
//         />
//       </Modal>
//     );
//   }
// }


// // src/components/Shared/Modal.js
// import React from "react";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
// import Modal from "react-modal";

// // somewhere in your app startup (e.g. index.js):
// // Modal.setAppElement("#root");

// export class BuzzModal extends React.Component {
//   render() {
//     const {
//       isOpen,
//       closeModal,
//       submitFunc,
//       item,
//       label = "Form",
//       submitLabel = "Submit"
//     } = this.props;

//     // all keys in your item definition
//     const allKeys = Object.keys(item);

//     // split into text vs. checkbox fields
//     const textFields = allKeys.filter(
//       k => typeof item[k] !== "object"
//     );
//     const checkboxFields = allKeys.filter(
//       k => typeof item[k] === "object" && item[k].type === "radio"
//     );

//     // two‑column split of text fields
//     const half = Math.ceil(textFields.length / 2);
//     const leftText  = textFields.slice(0, half);
//     const rightText = textFields.slice(half);

//     // build Formik initialValues
//     const initialValues = {
//       ...textFields.reduce((acc, k) => ({ ...acc, [k]: item[k] || "" }), {}),
//       ...checkboxFields.reduce(
//         (acc, k) => ({ ...acc, [k]: !!item[k].default }),
//         {}
//       )
//     };

//     // helper to humanize placeholders
//     const humanize = s =>
//       s[0].toUpperCase() +
//       s
//         .slice(1)
//         .replace(/([A-Z])/g, " $1")
//         .trim();

//     return (
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         contentLabel={label}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 1000,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           },
//           content: {
//             position: "relative",
//             inset: "auto",
//             padding: "2rem",
//             border: "none",
//             borderRadius: "8px",
//             backgroundColor: "#FFF9E6",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             maxWidth: "700px",
//             width: "90%",
//             maxHeight: "90vh",
//             overflowY: "auto"
//           }
//         }}
//       >
//         {/* Close “×” */}
//         <button
//           onClick={closeModal}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             border: "none",
//             background: "transparent",
//             fontSize: "1.5rem",
//             cursor: "pointer",
//             color: "#555"
//           }}
//         >
//           ×
//         </button>

//         {/* Title */}
//         <h2 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#333" }}>
//           {label}
//         </h2>

//         <Formik
//           initialValues={initialValues}
//           onSubmit={(values, actions) => {
//             submitFunc(values).then(({ status }) => {
//               if (status < 400) {
//                 closeModal();
//                 window.location.reload();
//               }
//             });
//           }}
//         >
//           {({ isSubmitting }) => (
//             <FormikForm>
//               {/* two‑column grid */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "2rem"
//                 }}
//               >
//                 {/* Left column: first half of text fields + all checkboxes */}
//                 <div>
//                   {leftText.map((key) => (
//                     <div key={key} style={{ marginBottom: "1.25rem" }}>
//                       <Field
//                         name={key}
//                         placeholder={humanize(key)}
//                         style={{
//                           width: "100%",
//                           border: "none",
//                           borderBottom: "1px solid #CCC",
//                           padding: "4px 0",
//                           outline: "none",
//                           fontSize: "1rem",
//                           background: "transparent"
//                         }}
//                       />
//                       <ErrorMessage
//                         name={key}
//                         component="div"
//                         style={{ color: "red", fontSize: "0.875rem" }}
//                       />
//                     </div>
//                   ))}

//                   {checkboxFields.map((key) => (
//                     <label
//                       key={key}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginTop: "0.5rem",
//                         fontSize: "1rem"
//                       }}
//                     >
//                       <Field
//                         type="checkbox"
//                         name={key}
//                         style={{
//                           marginRight: "0.5rem",
//                           width: "1rem",
//                           height: "1rem"
//                         }}
//                       />
//                       {humanize(key)}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Right column: second half of text fields */}
//                 <div>
//                   {rightText.map((key) => (
//                     <div key={key} style={{ marginBottom: "1.25rem" }}>
//                       <Field
//                         name={key}
//                         placeholder={humanize(key)}
//                         style={{
//                           width: "100%",
//                           border: "none",
//                           borderBottom: "1px solid #CCC",
//                           padding: "4px 0",
//                           outline: "none",
//                           fontSize: "1rem",
//                           background: "transparent"
//                         }}
//                       />
//                       <ErrorMessage
//                         name={key}
//                         component="div"
//                         style={{ color: "red", fontSize: "0.875rem" }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: "2rem"
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   style={{
//                     padding: "0.75rem 1.5rem",
//                     marginRight: "1rem",
//                     border: "none",
//                     background: "transparent",
//                     fontSize: "1rem",
//                     cursor: "pointer",
//                     color: "#555"
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     padding: "0.75rem 1.5rem",
//                     backgroundColor: "#FCD77F",              // a bit richer yellow
//                     color: "#000",                            // ensure the text is black
//                     border: "2px solid #000",                 // thicker black border
//                     borderRadius: "8px",   
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     cursor: "pointer"
//                   }}
//                 >
//                   {submitLabel}
//                 </button>
//               </div>
//             </FormikForm>
//           )}
//         </Formik>
//       </Modal>
//     );
//   }
// }

// import React from "react";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
// import Modal from "react-modal";

// // somewhere in your app startup (e.g. index.js):
// // Modal.setAppElement("#root");

// export class BuzzModal extends React.Component {
//   render() {
//     const {
//       isOpen,
//       closeModal,
//       submitFunc,
//       item,
//       label = "New Member Info",
//       submitLabel = "+ Add Member"
//     } = this.props;

//     // split keys into text vs. checkbox fields
//     const allKeys = Object.keys(item);
//     const textFields = allKeys.filter(k => typeof item[k] !== "object");
//     const checkboxFields = allKeys.filter(
//       k => typeof item[k] === "object" && item[k].type === "radio"
//     );

//     // two‑column split of text fields
//     const half = Math.ceil(textFields.length / 2);
//     const leftText  = textFields.slice(0, half);
//     const rightText = textFields.slice(half);

//     // Formik initialValues
//     const initialValues = {
//       ...textFields.reduce((acc, k) => ({ ...acc, [k]: item[k] || "" }), {}),
//       ...checkboxFields.reduce(
//         (acc, k) => ({ ...acc, [k]: !!item[k].default }),
//         {}
//       )
//     };

//     // helper to turn "firstName" → "First Name"
//     const humanize = s =>
//       s[0].toUpperCase() +
//       s
//         .slice(1)
//         .replace(/([A-Z])/g, " $1")
//         .trim();

//     return (
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         contentLabel={label}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 1000,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           },
//           content: {
//             position: "relative",
//             inset: "auto",
//             padding: "2rem",
//             border: "none",
//             borderRadius: "8px",
//             backgroundColor: "#FFF9E6",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             maxWidth: "700px",
//             width: "90%",
//             maxHeight: "90vh",
//             overflowY: "auto"
//           }
//         }}
//       >
//         {/* Close “×” */}
//         <button
//           onClick={closeModal}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             border: "none",
//             background: "transparent",
//             fontSize: "1.5rem",
//             cursor: "pointer",
//             color: "#555"
//           }}
//         >
//           ×
//         </button>

//         {/* Title */}
//         <h2 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#333" }}>
//           {label}
//         </h2>

//         <Formik
//           initialValues={initialValues}
//           onSubmit={(values, actions) => {
//             submitFunc(values).then(({ status }) => {
//               if (status < 400) {
//                 closeModal();
//                 window.location.reload();
//               }
//             });
//           }}
//         >
//           {({ isSubmitting }) => (
//             <FormikForm>
//               {/* two‑column grid */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   columnGap: "2rem",
//                   rowGap: "1.25rem"
//                 }}
//               >
//                 {/* Left column: first half of text fields + all checkboxes */}
//                 <div>
//                   {leftText.map(key => (
//                     <div key={key}>
//                       <Field
//                         name={key}
//                         placeholder={humanize(key)}
//                         style={{
//                           width: "100%",
//                           border: "none",
//                           borderBottom: "1px solid #CCC",
//                           padding: "4px 0",
//                           outline: "none",
//                           fontSize: "1rem",
//                           background: "transparent"
//                         }}
//                       />
//                       <ErrorMessage
//                         name={key}
//                         component="div"
//                         style={{ color: "red", fontSize: "0.875rem" }}
//                       />
//                     </div>
//                   ))}

//                   {checkboxFields.map(key => (
//                     <label
//                       key={key}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginTop: "0.5rem",
//                         fontSize: "1rem"
//                       }}
//                     >
//                       <Field
//                         type="checkbox"
//                         name={key}
//                         style={{
//                           marginRight: "0.5rem",
//                           width: "1rem",
//                           height: "1rem"
//                         }}
//                       />
//                       {humanize(key)}
//                     </label>
//                   ))}
//                 </div>

//                 {/* Right column: second half of text fields */}
//                 <div>
//                   {rightText.map(key => (
//                     <div key={key}>
//                       <Field
//                         name={key}
//                         placeholder={humanize(key)}
//                         style={{
//                           width: "100%",
//                           border: "none",
//                           borderBottom: "1px solid #CCC",
//                           padding: "4px 0",
//                           outline: "none",
//                           fontSize: "1rem",
//                           background: "transparent"
//                         }}
//                       />
//                       <ErrorMessage
//                         name={key}
//                         component="div"
//                         style={{ color: "red", fontSize: "0.875rem" }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: "2rem"
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   style={{
//                     padding: "0.75rem 1.5rem",
//                     marginRight: "1rem",
//                     border: "none",
//                     background: "transparent",
//                     fontSize: "1rem",
//                     cursor: "pointer",
//                     color: "#555"
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     padding: "0.75rem 1.5rem",
//                     backgroundColor: "#FCD77F",
//                     color: "#000",
//                     border: "2px solid #000",
//                     borderRadius: "8px",
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     cursor: "pointer"
//                   }}
//                 >
//                   {submitLabel}
//                 </button>
//               </div>
//             </FormikForm>
//           )}
//         </Formik>
//       </Modal>
//     );
//   }
// }


// src/components/Shared/Modal.js
import React from "react";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import Modal from "react-modal";
import "./Modal.css";

// make sure you call this once in your app
Modal.setAppElement("#root");

export class BuzzModal extends React.Component {
  render() {
    const {
      isOpen,
      closeModal,
      submitFunc,
      item,
      label = "New Member Info",
      submitLabel = "+ Add Member"
    } = this.props;

    // split item keys into text vs. checkbox
    const allKeys       = Object.keys(item);
    const textFields    = allKeys.filter(k => typeof item[k] !== "object");
    const checkboxFields = allKeys.filter(
      k => typeof item[k] === "object" && item[k].type === "radio"
    );

    // two‑column split
    const half      = Math.ceil(textFields.length / 2);
    const leftText  = textFields.slice(0, half);
    const rightText = textFields.slice(half);

    // Formik initialValues
    const initialValues = {
      ...textFields.reduce((acc, k) => ({ ...acc, [k]: item[k] || "" }), {}),
      ...checkboxFields.reduce((acc, k) => ({ ...acc, [k]: !!item[k].default }), {})
    };

    // helper to humanize field names
    const humanize = s =>
      s[0].toUpperCase() +
      s
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim();

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel={label}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        {/* Close button */}
        <button onClick={closeModal} className="modal-close-button">
          ×
        </button>

        {/* Title */}
        <h2 className="modal-title">{label}</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            submitFunc(values).then(({ status }) => {
              if (status < 400) {
                closeModal();
                window.location.reload();
              }
            });
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm>
              {/* form grid */}
              <div className="modal-form-grid">
                {/* left column */}
                <div>
                  {leftText.map(key => (
                    <div key={key} className="modal-form-field">
                      <Field
                        name={key}
                        placeholder={humanize(key)}
                        className="modal-input"
                      />
                      <ErrorMessage
                        name={key}
                        component="div"
                        className="modal-error"
                      />
                    </div>
                  ))}

                  {checkboxFields.map(key => (
                    <label key={key} className="modal-checkbox-label">
                      <Field
                        type="checkbox"
                        name={key}
                        className="modal-checkbox"
                      />
                      {humanize(key)}
                    </label>
                  ))}
                </div>

                {/* right column */}
                <div>
                  {rightText.map(key => (
                    <div key={key} className="modal-form-field">
                      <Field
                        name={key}
                        placeholder={humanize(key)}
                        className="modal-input"
                      />
                      <ErrorMessage
                        name={key}
                        component="div"
                        className="modal-error"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* action buttons */}
              <div className="modal-action-buttons">
                <button
                  type="button"
                  onClick={closeModal}
                  className="modal-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="modal-submit-button"
                >
                  {submitLabel}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    );
  }
}
