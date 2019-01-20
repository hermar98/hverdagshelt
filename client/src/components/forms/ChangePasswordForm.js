// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { User, Issue } from '../../models.js';
import { issueService } from '../../services/IssueService.js';
import { tokenManager } from '../../tokenManager';
import { userService } from '../../services/UserService';

type P = { userId: number };
type S = {};

export default class ChangePasswordForm extends Component<P, S> {
  user = new User();
  currentPassword = '';
  newPassword = '';
  newPasswordRepeated = '';

  mounted() {
    userService
      .getUser(tokenManager.getUserId())
      .then(rows => {
        this.user = rows;
      })
      .catch(error => console.log(error));
  }

  handleChangePassword(e: Object) {
    e.preventDefault();

    userService
      .login(this.user.email, this.currentPassword)
      .then(() => {
        if (this.newPassword != this.newPasswordRepeated) {
          console.log('Passordene er ikke like');
        } else {
          this.user.password = this.newPassword;
          console.log(this.user);
          userService.updateUser(this.user);
        }
      })
      .catch(error => console.log('Nåverende passord er feil'));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleChangePassword}>
          <div>
            <input
              type="password"
              onChange={event => (this.currentPassword = event.target.value)}
              required
              placeholder="Nåværende passord"
            />
          </div>

          <div>
            <input
              type="password"
              onChange={event => (this.newPassword = event.target.value)}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
              placeholder="Nytt passord"
            />
          </div>

          <div>
            <input
              type="password"
              onChange={event => (this.newPasswordRepeated = event.target.value)}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
              placeholder="Gjenta passord"
            />
          </div>

          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <button type="submit">Endre Passord</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
