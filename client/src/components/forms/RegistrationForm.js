// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services.js';
import { history } from '../../index.js';

export default class RegistrationForm extends Component {
  user = new User();
  form = null;
  munId = localStorage.getItem('munId');

  render() {
    return (
      <Card title="Registrer ny bruker">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
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
            type="email"
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
        </form>
      </Card>
    );
  }
  save() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    userService
      .addUser(this.user)
      .then(() => history.push('/municipal/' + this.munId))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
