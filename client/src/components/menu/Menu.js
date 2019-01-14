// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';

export default class Menu extends Component {
  render() {
    return (
      <div>
        <NavBar>
            <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
            <NavBar.Link to="/events">Events/hendelser</NavBar.Link>
            <NavBar.Link to="/issues">Innmeldinger</NavBar.Link>
            <NavBar.Link to="/registerIssue">Registrer sak</NavBar.Link>
            <NavBar.Link to="/login">Logg inn</NavBar.Link>
            <NavBar.Link to="/registerUser">Registrer bruker</NavBar.Link>
        </NavBar>
      </div>
    );
  }
}
