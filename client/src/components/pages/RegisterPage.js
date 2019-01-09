// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../services';
import RegistrationForm from '../../components/forms/RegistrationForm';

export class RegisterPage extends Component {
  user = new User();

  render() {
    return (
      <div>
        <RegistrationForm />
      </div>
    );
  }
}
