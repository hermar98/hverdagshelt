// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { Issue } from '../../models/Issue.js';
import { issueService } from '../../services/IssueService';
import { tokenManager } from '../../tokenManager';
import {User} from "../../models/User";
import {userService} from "../../services/UserService";
import {HoverButton} from "../issueViews/issueViews";

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
        <form className="change-password-form">
          <div className="justify-content-center align-items-center row">
            <input
              type="password"
              onChange={event => (this.currentPassword = event.target.value)}
              required
              placeholder="Nåværende passord"
            />
          </div>

          <div className="justify-content-center align-items-center row">
            <input
              type="password"
              onChange={event => (this.newPassword = event.target.value)}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
              placeholder="Nytt passord"
            />
          </div>

          <div className="justify-content-center align-items-center row">
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
              <HoverButton onclick={this.handleChangePassword} text="Endre passord"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
