// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';

export default class RegistrationForm extends Component {
  user = new User();

  render() {
    return (
      <Card title="Registrer ny bruker">
        <Form.Input
          type="text"
          onChange={event => (this.user.firstName = event.target.value)}
          required
          placeholder="Skriv inn fornavn"
        />
        <Form.Input
          type="text"
          onChange={event => (this.user.lastName = event.target.value)}
          required
          placeholder="Skriv inn etternavn"
        />
        <Form.Input
          type="text"
          onChange={event => (this.user.email = event.target.value)}
          required
          placeholder="Skriv inn epost"
        />
        <Form.Input
          type="password"
          onChange={event => (this.user.password = event.target.value)}
          required
          placeholder="Passord"
        />
        <Form.Input type="password" required placeholder="Gjenta passord" />
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <Button.Basic onClick={this.save}>Lag bruker</Button.Basic>
          </div>
        </div>
      </Card>
    );
  }
  save() {
    userService
      .addUser(this.user)
      .then(() => history.push('/home'))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
