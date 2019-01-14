// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import Menu from '../menu/Menu';

export class RegisterPage extends Component {
  user = new User();

  render() {
    return (
      <div>
        <Menu/>
        <RegistrationForm />
      </div>
    );
  }
}
