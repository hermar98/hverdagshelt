// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Button, Card, Form } from '../../widgets';
import { tokenManager } from '../../tokenManager.js';
import { history } from '../../index';
import { User } from '../../models/User';
import { userService } from '../../services/UserService';
import { HoverButton } from '../issueViews/issueViews';

export default class Login extends Component {
  state = {
    loginError: false
  };
  email = '';
  password = '';
  form = null;
  rank = 0;

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
            {this.state.loginError ? <Form.Alert text="Feil e-post og/eller passord" type="danger" /> : <div />}
            <div className="container h-100">
              <div className="row h-100 justify-content-center align-items-center">
                <HoverButton type="submit" onclick={this.login} text="Logg Inn" />
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
      .login(this.email, this.password)
      .then(token => {
        tokenManager.addToken(token);
        userService
          .getCurrentUser()
          .then(user => {
            this.user = user;
            if (this.user.rank === 0) {
              tokenManager.deleteToken();
              history.push('/aktiver/aktiverBruker');
            } else if (this.user.rank === 1) {
              window.location.reload();
              history.push('/minSide');
            } else if (this.user.rank === 2) {
              window.location.reload();
              history.push('/bedrift');
            } else if (this.user.rank === 3) {
              window.location.reload();
              history.push('/kommune/' + this.user.munId);
            } else {
              window.location.reload();
              history.push('/admin');
            }
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => {
        console.log(error);
        this.setState({ loginError: true });
      });
  }

  goTo() {
    history.push('/glemtPassord');
  }
}
