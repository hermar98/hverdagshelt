// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert , NavBar, Form, Card, Button} from '../../widgets';
import { User, Issue} from '../../models.js';
import { userService, issueService } from "../../services.js"
import {tokenManager} from '../../tokenManager.js';
import {history} from "../../index";

export default class Login extends Component {
    email = '';
    password = '';
    form = null;
    loginError = false;

    render() {
        return(
            <Card title="Logg inn">
                <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
                    <Form.Input
                        type="email"
                        label="E-post"
                        onChange={event => (this.email = event.target.value)}
                        required
                        placeholder="Skriv inn e-post"/>
                    <Form.Input
                        type="password"
                        label="Passord"
                        onChange={event => (this.password = event.target.value)}
                        required
                        placeholder="Skriv inn passord"/>
                    {this.loginError ? (
                        <Form.Alert text="Feil e-post og/eller passord"/>
                    ) : (
                        <div/>
                    )}
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center align-items-center">
                            <Button.Basic type="submit" onClick={this.login}>Logg inn</Button.Basic>
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

    mounted() {
        userService.getToken().then(token => {
            console.log(token);
            history.push('/issues');
        }).catch((error: Error) => console.log(error));
    }

    login() {
        if (!this.form || !this.form.checkValidity()) {
            return;
        }

        userService
            .login(this.email, this.password)
            .then(token => {
                tokenManager.addToken(token);
                history.push('/issues');
            })
            .catch((error: Error) => {
                console.log(error);
                this.loginError = true;
            });
    }

    userService
      .login(this.email, this.password)
      .then(token => {
        localStorage.setItem('token', JSON.stringify(token));
        history.push('/issues');
        console.log('Login ok');
      })
      .catch((error: Error) => Alert.danger('Feil brukernavn eller passord'));
  }

  goTo() {
    history.push('/forgotpassword');
  }
}
