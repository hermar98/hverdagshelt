// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';

export class RegisterPage extends Component {
  user = new User();

  render() {
    return (
      <div className="mb-5">
        <RegistrationForm />
      </div>
    );
  }
}
