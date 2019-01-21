import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import EventForm from '../../components/forms/EventForm';
import MenuMunicipalWorker from '../../components/menu/Menu.js';

export class RegisterEventPage extends Component {

  render() {
    return (
      <div>
        <MenuMunicipalWorker />
        <EventForm />
      </div>
    );
  }
}