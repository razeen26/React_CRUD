import { map } from 'lodash';
import React from 'react'
import { connect } from "react-redux";
import { fetchStream } from "../../actions"

class StreamShow extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }else{
      return (
        <div>
          <h1>{this.props.stream.title}</h1>
          <p>{this.props.stream.description}</p>
        </div>
      );
    }
    
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  { fetchStream: fetchStream }
)(StreamShow);