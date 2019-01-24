// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { Issue } from '../../models/Issue.js';
import { issueService } from '../../services/IssueService.js';
import { history } from '../../index';
import { User } from '../../models/User';
import { userService } from '../../services/UserService';
import { HoverButton } from "../issueViews/issueViews";

export default class NewPasswordForm extends Component {
  state = {
    passwordOk: false,
    passwordError: false
  };
  password = '2';
  passwordr = '';
  form = null;
  munId = localStorage.getItem('munId');

  render() {
    return (
      <Card title="Nytt Passord">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="password"
            onChange={event => (this.password = event.target.value)}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
            placeholder="Nytt Passord"
          />
          <Form.Input
            type="password"
            onChange={event => (this.passwordr = event.target.value)}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
            placeholder="Repeter Nytt Passord"
          />
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton onclick={this.login} text="Bytt Passord"/>
            </div>
            {this.state.passwordError ? <Form.Alert type="danger" text="Sørg for at passordene er like" /> : <div />}
          </div>
        </form>
      </Card>
    );
  }

  login() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }
    if (!(this.password == this.passwordr)) {
      this.setState({ passwordError: true, passwordOk: false });
      return;
    }

    userService
      .newPassword(window.location.hash.slice(8), this.password)
      .then(token => {
        localStorage.setItem('token', JSON.stringify(token));
        history.push('/kommune/' + this.munId);
        console.log('Login ok');
        console.log(this.password + 'form');
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
