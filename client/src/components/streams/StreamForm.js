import React from 'react'
import { Field, reduxForm } from "redux-form";


class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>
            {error}
          </div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    // console.log(formProps);
    // console.log(formProps.meta);
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{formProps.label} </label>
        <input {...formProps.input} autoComplete="off" />
        {/* <div>{formProps.meta.error}</div> */}
        {this.renderError(formProps.meta)}
      </div>
    );
  }

  onFormSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmitProp(formValues);
  }

  render() {
    // console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} className='ui form error'>
        <Field name='title' component={this.renderInput} label="Enter Title" />
        <Field name='description' component={this.renderInput} label="Enter Description" />
        <br />
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {}

  if (!formValues.title) {
    errors.title = "You must enter a title!";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description!";
  }
  return errors;
}

// For connecting action creator 
// export default  connect()(reduxForm({
//   form: "createStream",
//   validate: validate
// })(StreamCreate));


export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);

