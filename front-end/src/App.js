import React, { Component } from 'react';
import Home from "./components/home/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container center">
      <h1>Zapp Gaming</h1>
        <Home />
      </div>
    );
  }
}

export default App;
