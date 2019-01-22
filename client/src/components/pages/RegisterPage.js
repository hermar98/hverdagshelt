// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { NotLoggedInMenu } from '../menu/NotLoggedInMenu';

export class RegisterPage extends Component {
  user = new User();

  render() {
    return (
      <div>
        <NotLoggedInMenu />
        <RegistrationForm />
      </div>
    );
  }
}
