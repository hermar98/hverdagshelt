// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services/UserService.js';
import { Issue } from '../../models/Issue';
import { history } from '../../index';
import { User } from '../../models/User';

export default class Login extends Component {
  state = {
    sendOk: false,
    sendError: false
  };
  email = '';
  form = null;

  render() {
    return (
      <div>
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
              {this.state.sendOk ? <Form.Alert type="success" text="Sendt" /> : <div />}
              {this.state.sendError ? <Form.Alert type="danger" text="Finner ingen bruker med den emailen" /> : <div />}
            </div>
          </form>
        </Card>
      </div>
    );
  }

  login() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    userService
      .forgotPassword(this.email)
      .then(res => {
        console.log(res);
        if (res !== 'email er ikke i databasen') {
          this.setState({ sendOk: true, sendError: false });
        } else {
          this.setState({ sendError: true, sendOk: false });
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}
