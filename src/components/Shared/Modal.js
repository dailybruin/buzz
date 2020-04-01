import React from "react";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import Modal from "react-modal";

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  className,
  ...props
}) => {
  return (
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
  );
};

export class BuzzModal extends React.Component {
  constructor(props) {
    super(props);
    this.renderObjectItem = this.renderObjectItem.bind(this);
  }

  renderObjectItem(key) {
    const item = this.props.item[key];

    if (item.type === "radio") {
      return (<div key={key}>
        <label htmlFor={key}>{key}:{' '}</label>
        <Field component={Checkbox} name={key} id={key} />
        <ErrorMessage name={key} component="div" />
      </div>
      )}
  }

  render() {
    const data = Object.keys(this.props.item);
    const initialValues = data.reduce((acc, curr, index) => {
      if (typeof this.props.item[curr] !== "object") {
        acc[curr] = this.props.item[curr];
      } else {
        if (this.props.item[curr].type === "radio") {
          acc[curr] = this.props.item[curr].default ? this.props.item[curr].default : false;
        }
      }
      return acc;
    }, {});

    return (
      <Modal onRequestClose={this.props.closeModal} isOpen={this.props.isOpen} contentLabel={this.props.label || "Edit"}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            this.props.submitFunc(values).then(({ data, status }) => {
              if (status < 400) {
                if (window) {
                  window.location.reload();
                }
              }
            })
          }}
          render={({ errors, handleChange, status, touched, values, isSubmitting }) => {
            return (
            <FormikForm>
              {data.map(f => {
                if (typeof this.props.item[f] !== "object") {
                  return (
                    <div key={f}>
                      <label htmlFor={f}>{f}:{' '}</label>
                      <Field
                        type="text"
                        name={f}
                      />
                      <ErrorMessage name={f} component="div" />
                    </div>
                  )
                }
                return this.renderObjectItem(f);
                })}
              {status && status.msg && <div>{status.msg}</div>}
              <button className="primary" type="submit" disabled={isSubmitting}>
                <span className="semibold">+</span> Create
                  </button>
            </FormikForm>);
          }}
        />
      </Modal>
    );
  }
}