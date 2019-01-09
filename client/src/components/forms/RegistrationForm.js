import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';

export default class RegistrationForm extends Component {
  user = new User();

  render() {
    return (
      <div>
        <Card title="Registrer ny bruker">
          <Form.Input
            type="text"
            label="Fornavn: "
            onChange={event => (this.user.firstName = event.target.value)}
            required
            placeholder="Skriv inn fornavn"
          />
          <Form.Input
            type="text"
            label="Etternavn: "
            onChange={event => (this.user.lastName = event.target.value)}
            required
            placeholder="Skriv inn etternavn"
          />
          <Form.Input
            type="text"
            label="Email: "
            onChange={event => (this.user.email = event.target.value)}
            required
            placeholder="Skriv inn epost"
          />
          <Form.Input
            type="password"
            label="Passord: "
            onChange={this.save} //TODO
            required
            placeholder="Passord"
          />
          <Form.Input type="password" required placeholder="Gjenta passord" />
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Success onClick={this.save}>Create user</Button.Success>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  save() {
    userService
      .addUser(this.user)
      .then(() => history.push('/home'))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
