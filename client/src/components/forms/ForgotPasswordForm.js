// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services.js';
import { User, Issue } from '../../models.js';
import { history } from '../../index';

export default class Login extends Component {
  email = '';
  form = null;
  message = '';

  render() {
    return (
      <Card title="Glemt Passord">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="email"
            onChange={event => (this.email = event.target.value)}
            required
            placeholder="Skriv inn epost"
          />
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic type="submit" onClick={this.login}>
                Send Epost
              </Button.Basic>
            </div>
          </div>
          <div className="container h-100">
            <div className="row justify-content-center align-items-center">{this.message}</div>
          </div>
        </form>
      </Card>
    );
  }

  login() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    userService
      .forgotPassword(this.email)
      .then(res => {
        if (res.bad) {
          Alert.danger(res.bad);
        } else {
          Alert.success(res);
          history.push('/');
        }
      })
      .catch((error: error) => Alert.danger(error));
  }
}