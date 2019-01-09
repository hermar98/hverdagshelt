import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
          <NavBar.Link to="/">Home</NavBar.Link>
          <NavBar.Link to="/register">Registrer bruker</NavBar.Link>
        </NavBar>
      </div>
    );
  }
}
