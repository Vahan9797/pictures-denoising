import React, { Component } from 'react';

class ErrorPage extends Component {
  redirectToHome() {
    fetch('http://localhost:8080/');
  }

  componentDidMount() {
    let error = this.props.error;
    let errorMsg = this.props.errorMsg;
    debugger;
  }

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