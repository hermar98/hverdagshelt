// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import LoginForm from '../../components/forms/LoginForm';
import { NewMenu } from '../../components/menu/NewMenu.js';

export class LoginPage extends Component {
  render() {
    return (
      <div>
        <NewMenu />
        <LoginForm />
      </div>
    );
  }
}
