import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import EventForm from '../../components/forms/EventForm';
import Menu from '../../components/menu/Menu.js';

export class RegisterEventPage extends Component {

  render() {
    return (
      <div>
        <EventForm />
      </div>
    );
  }
}