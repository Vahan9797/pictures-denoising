import React, { Component } from 'react';
import Uploader from './Uploader';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="logo.svg" className="App-logo" alt="logo" />
        </header>
        <p className="App-intro" onClick={() => console.log('click on App text')}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Uploader />
      </div>
    );
  }
}

export default App;