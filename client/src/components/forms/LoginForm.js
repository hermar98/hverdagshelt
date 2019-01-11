// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert , NavBar, Form, Card, Button} from '../../widgets';
import { User, Issue} from '../../models.js';
import { userService, issueService } from "../../services.js"
import {history} from "../../index";

export default class Login extends Component {
    email = '';
    password = '';
    form = null;

    render() {
        return(
            <Card title="Logg inn">
                <Form.Input
                    type="text"
                    onChange={event => (this.email = event.target.value)}
                    required
                    placeholder="Skriv inn epost"/>
                <Form.Input
                    type="password"
                    onChange={event => (this.password = event.target.value)}
                    required
                    placeholder="Skriv inn passord"/>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <Button.Basic onClick={this.save}>Logg inn</Button.Basic>
                    </div>
                </div>
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center">
                        <Button.Link onClick={this.goTo}>Glemt passord</Button.Link>
                    </div>
                </div>
            </Card>
        );
    }

    save() {
        userService
            .login(this.email, this.password)
            .then(token => {
                localStorage.setItem('token', JSON.stringify(token));
                history.push('/issues');
                console.log('Login ok')
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    goTo() {
        history.push('/sendEmail')
    }
}
