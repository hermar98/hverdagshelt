import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import Menu from '../../components/menu/Menu.js';
import axios from 'axios';

const title = {
  pageTitle: 'Forgot Password Screen'
};

export class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <ForgotPasswordForm />
      </div>
    );
  }
}
