import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import EventForm from '../../components/forms/EventForm.js';
import Menu from '../../components/menu/Menu.js';

export default class RegisterEventPage extends Component {

  render() {
    return (
      <div>
        <Menu />
        <EventForm />
      </div>
    );
  }
}