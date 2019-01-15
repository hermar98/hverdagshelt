// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { User, Issue } from '../../models.js';
import { userService, issueService } from '../../services.js';
import { history } from '../../index';

export default class NewPasswordForm extends Component {
  password = '2';
  passwordr = '';
  form = null;

  render() {
    return (
      <Card title="Nytt Passord">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="password"
            onChange={event => (this.password = event.target.value)}
            required
            placeholder="Nytt Passord"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
          <Form.Input
            type="password"
            onChange={event => (this.passwordr = event.target.value)}
            required
            placeholder="Repeter Nytt Passord"
          />
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic type="submit" onClick={this.login}>
                Bytt Passord
              </Button.Basic>
            </div>
          </div>
          <div className="container h-100">
            <div className="row justify-content-center align-items-center">
              <Button.Link onClick={this.goTo}>Glemt passord</Button.Link>
            </div>
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
      Alert.danger('Passord ikke like!');
      return;
    }

    userService
      .newPassword(window.location.hash.slice(8), this.password)
      .then(token => {
        localStorage.setItem('token', JSON.stringify(token));
        history.push('/issues');
        console.log('Login ok');
      })
      .catch((error: Error) => Alert.danger(error));
  }

  goTo() {
    console.log(this.password);
    console.log('asd');
  }
}