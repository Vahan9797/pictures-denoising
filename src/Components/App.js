import React, { Component } from 'react';
import Uploader from './Uploader';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="public/logo.svg" className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          Pictures Denoising
        </p>
        <div className="App-body"><Uploader /></div>
      </div>
    )
  }
}

export default App;