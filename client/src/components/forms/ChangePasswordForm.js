// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { User, Issue } from '../../models.js';
import { userService, issueService } from '../../services.js';

export default class ChangePasswordForm extends Component {
  render() {
    return (
      <div>
        <div>
          <Form.Input
            type="password"
            onChange={event => (this.user.firstName = event.target.value)}
            required
            placeholder="Nytt passord"
          />
        </div>
        <div>
          <Form.Input
            type="password"
            onChange={event => (this.user.firstName = event.target.value)}
            required
            placeholder="Gjenta passord"
          />
        </div>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <Button.Basic onClick={this.save}>Endre Passord</Button.Basic>
          </div>
        </div>
      </div>
    );
  }

  goTo() {
    history.push('/sendEmail');
  }
}
