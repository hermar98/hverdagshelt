// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { Issue } from '../../models/Issue.js';
import { tokenManager } from '../../tokenManager.js';
import { history } from '../../index';
import {User} from "../../models/User";
import {userService} from "../../services/UserService";
import { issueService } from '../../services/IssueService.js';


export default class Login extends Component {
  email = '';
  password = '';
  form = null;
  loginError = false;
  munId = localStorage.getItem('munId');
  user = new User();

  render() {
    return (
        <div id="log-in">
      <Card title="Logg inn">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="email"
            label="E-post"
            onChange={event => (this.email = event.target.value)}
            required
            placeholder="Skriv inn e-post"
          />
          <Form.Input
            type="password"
            label="Passord"
            onChange={event => (this.password = event.target.value)}
            required
            placeholder="Skriv inn passord"
          />
          {this.loginError ? <Form.Alert text="Feil e-post og/eller passord" /> : <div />}
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic type="submit" onClick={this.login}>
                Logg inn
              </Button.Basic>
            </div>
          </div>
        </form>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center">
            <Button.Link onClick={this.goTo}>Glemt passord</Button.Link>
          </div>
        </div>
      </Card>
        </div>
    );
  }

  mounted() {
    userService
      .getToken()
      .then(token => {
        console.log(token);
        history.push('/');
      })
      .catch((error: Error) => console.log(error));
  }

  login() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    userService
      .login(this.email, this.password)
      .then(token => {
        tokenManager.addToken(token);
        userService.getUser(tokenManager.getUserId())
          .then(user =>{
            this.user = user;
            if(this.user.rank === 0){
              history.push('/activate/aktiverBruker');
            }else{
              history.push('/feed');
            }
          })
          .catch((error: Error) => console.log(error))
      })
      .catch((error: Error) => {
        console.log(error);
        this.loginError = true;
      });
  }

  goTo() {
    history.push('/glemtPassord');
  }
}
