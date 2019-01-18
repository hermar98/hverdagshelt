// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services/UserService.js';
import { history } from '../../index.js';

export default class RegistrationForm extends Component {
  user = new User();
  repeatPassword = '';
  passwordLengthOk = true;
  passwordsMatch = true;
  emailRegistered = false;
  form = null;
  munId = localStorage.getItem('munId');

  render() {
    return (
      <Card title="Registrer ny bruker">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="text"
            label="Fornavn"
            onChange={event => (this.user.firstName = event.target.value)}
            required
            placeholder="Skriv inn fornavn"
          />
          <Form.Input
            type="text"
            label="Etternavn"
            onChange={event => (this.user.lastName = event.target.value)}
            required
            placeholder="Skriv inn etternavn"
          />
          <Form.Input
            type="email"
            label="E-post"
            onChange={event => (this.user.email = event.target.value)}
            required
            placeholder="Skriv inn epost"
          />
          <Form.Input
            type="password"
            label="Passord"
            onChange={event => (this.user.password = event.target.value)}
            required
            placeholder="Passord"
          />
          <Form.Input
              type="password"
              label="Gjenta passord"
              onChange={event => (this.repeatPassword = event.target.value)}
              required
              placeholder="Gjenta passord" />
          {this.passwordLengthOk ? (
              <div/>
          ) : (
              <Form.Alert text="Du må bruke minst 8 tegn i passordet ditt"/>
          )}
          {this.passwordsMatch ? (
              <div/>
          ) : (
              <Form.Alert text="Passordene samsvarer ikke. Prøv på nytt."/>
          )}
          {this.emailRegistered ? (
              <Form.Alert text="E-posten er allerede registrert"/>
          ) : (
              <div/>
          )}
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

    if (this.user.password.length < 8) {
      this.passwordLengthOk = false;
      return;
    } else {
      this.passwordLengthOk = true;
    }

    if (this.user.password !== this.repeatPassword) {
      this.passwordsMatch = false;
      return;
    } else {
      this.passwordsMatch = true;
    }

    this.user.rank = 1;

    userService
      .addUser(this.user)
      .then(() => history.push('/municipal/' + this.munId+ '/login'))
      .catch((error: Error) => {
        console.log(error);
        this.emailRegistered = true;
      });
  }
}
