import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className="ErrorPage">
        <div className="error-status">{this.props.error.status}</div>
        <p className="error-message">
          {this.props.errorMsg}
        </p>
        <a href='/' className="btn btn-info" role="button">Go to Home Page.</a>
      </div>
    );
  }
}

export default ErrorPage;