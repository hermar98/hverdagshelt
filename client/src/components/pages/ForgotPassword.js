import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import { NotLoggedInMenu } from '../../components/menu/NotLoggedInMenu.js';

export class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <NotLoggedInMenu />
        <ForgotPasswordForm />
      </div>
    );
  }
}
