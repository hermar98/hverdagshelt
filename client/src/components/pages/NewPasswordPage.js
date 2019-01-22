import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import NewPasswordForm from '../../components/forms/NewPasswordForm';
import { NotLoggedInMenu } from '../../components/menu/NotLoggedInMenu.js';

const title = {
  pageTitle: 'Forgot Password Screen'
};

export class NewPasswordPage extends Component {
  render() {
    return (
      <div>
        <NotLoggedInMenu />
        <NewPasswordForm />
      </div>
    );
  }
}
