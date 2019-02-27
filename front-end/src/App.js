import React, { Component } from 'react';
import Home from "./components/home/Home";
import Headers from "./components/navHeader/Headers";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Headers/>
          <div className="container center">
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
