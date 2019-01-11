// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { User, Issue } from '../../models.js';
import { userService, issueService } from '../../services.js';

type P = { user_id: number };
type S = {};
export default class ChangePasswordForm extends Component<P, S> {
  user = new User();
  currentPassword = '';
  newPassword = '';
  newPasswordRepeated = '';

  mounted() {
    userService
      .getUser(this.props.user_id)
      .then(rows => {
        this.user = rows;
      })
      .catch(error => console.log(error));
  }

  handleChangePassword(e: Object) {
    e.preventDefault();

    let json = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rank: user.rank,
      salt: passwordData.salt,
      hash_str: passwordData.passwordHash
    };

    userService.updateUser(json);
  }

  render() {
    return (
      <div>
        <form
          action={'http://localhost:3000/users/' + this.props.user_id}
          method="PUT"
          onSubmit={this.handleChangePassword}
        >
          <div>
            <Form.Input
              type="password"
              onChange={event => (this.currentPassword = event.target.value)}
              required
              placeholder="Nåværende passord"
            />
          </div>
          <div>
            <Form.Input
              type="password"
              onChange={event => (this.newPassword = event.target.value)}
              required
              placeholder="Nytt passord"
            />
          </div>
          <div>
            <Form.Input
              type="password"
              onChange={event => (this.newPasswordRepeated = event.target.value)}
              required
              placeholder="Gjenta passord"
            />
          </div>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic type="submit">Endre Passord</Button.Basic>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
