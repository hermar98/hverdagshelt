import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import NewPasswordForm from '../../components/forms/NewPasswordForm';

const title = {
  pageTitle: 'Forgot Password Screen'
};

export class NewPasswordPage extends Component {
  render() {
    return (
      <div>
        <NewPasswordForm />
      </div>
    );
  }
}
