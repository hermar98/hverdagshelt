// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import LoginForm from '../../components/forms/LoginForm';
import Menu from '../../components/menu/Menu.js';


export class LoginPage extends Component {

    render() {
        return (
            <div>
                <Menu />
                <LoginForm />
            </div>
        );
    }
}