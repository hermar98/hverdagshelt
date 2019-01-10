// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import LoginForm from '../../components/forms/LoginForm';

export class LoginPage extends Component {
    user = new User();

    render() {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
}