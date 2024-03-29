import React from 'react'
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onFormSubmit = (formValues) => {
    // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h3>Edit a Stream</h3>
          <StreamForm
            initialValues={_.pick(this.props.stream, 'title', 'description')}
            onSubmitProp={this.onFormSubmit}
          />
        </div>
      )
    }

  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return {
    stream: state.streams[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  {
    fetchStream: fetchStream,
    editStream: editStream
  }
)(StreamEdit)