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
              <HoverButton type="submit" onclick={this.login} text="Bytt Passord"/>
            </div>
            {this.state.passwordError ? <Form.Alert type="danger" text="Sørg for at passordene er like" /> : <div />}
          </div>
        </form>
      </Card>
    );
  }

  mounted() {
      userService
          .getCurrentUser()
          .then(user => {
              if (user.rank === 1) {
                  history.push('/minSide');
              } else if (user.rank === 2) {
                  history.push('/bedrift');
              } else if (user.rank === 3) {
                  history.push('/kommune/' + user.munId);
              } else if (user.rank === 4) {
                  history.push('/admin');
              }
          })
          .catch((error : Error) => {
              console.log(error);
          })
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
      .newPassword(window.location.hash.slice(15), this.password)
      .then(token => {
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
        Alert.success('Passordet ble endret')
        history.push('/profil');
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
