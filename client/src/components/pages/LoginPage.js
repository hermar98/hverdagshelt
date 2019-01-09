// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import LoginForm from '../../components/forms/LoginForm';
import Menu from '../../components/menu/Menu.js';

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