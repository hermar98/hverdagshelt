import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import NewPasswordForm from '../../components/forms/NewPasswordForm';
import Menu from '../../components/menu/Menu.js';
import axios from 'axios';

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
