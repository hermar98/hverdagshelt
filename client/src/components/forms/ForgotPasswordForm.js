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
import {HoverButton} from "../issueViews/issueViews";

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
                <HoverButton onclick={this.login} type="submit" text="Send Epost"/>
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
