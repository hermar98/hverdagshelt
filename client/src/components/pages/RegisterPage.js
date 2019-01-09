import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import Menu from '../../components/menu/Menu.js';

export default class RegisterPage extends Component {
  user = new User();

  render() {
    return (
      <div>
        <Menu />
        <RegistrationForm />
      </div>
    );
  }
}
