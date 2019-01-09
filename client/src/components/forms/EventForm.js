import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';


export default class EventForm extends Component {
  event = new Event();

  render() {
    return(
      <Card title="Registrer event/hendelse" className="justify-content-center align-items-center">
        <Form.Input
          type="text"
          onChange={event => (this.event.title = event.target.value)}
          required
          placeholder="Tittel"/>
        <Form.Input
          type="text"
          onChange={event => (this.event.content = event.target.value)}
          required
          placeholder="Innhold/forklarende tekst"/>
        <Form.Input
          type="datetime-local"
          onChange={event => (this.event.time_start = event.target.value)}
          required
          placeholder="Fra dato & tidspunkt"/>
        <Form.Input
          type="datetime-local"
          onChange={event => this.event.time_end = event.target.value} //TODO
          required
          placeholder="Til date & tidspunkt"/>
        <Form.Input
          type="text"
          required
          placeholder="Adresse"/>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">

          </div>
        </div>
      </Card>
    );
  }
  save(){
    eventService
      .addEvent(this.event)
      .then(() => history.push('/home'))
      .catch((error: Error) => Alert.danger(error.message));
  }
}