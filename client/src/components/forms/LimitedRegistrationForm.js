// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services/UserService.js';
import { history } from '../../index.js';
import {tokenManager} from "../../tokenManager";
import {HoverButton} from "../issueViews/issueViews";


export default class LimitedRegistrationForm extends Component<{tokenId: string}>{
  user = new User();
  repeatPassword = '';
  passwordLengthOk = true;
  passwordsMatch = true;
  form = null;

  render() {
    return (
      <Card title="Registrer ny bruker">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="text"
            label="Fornavn"
            onChange={event => (this.user.firstName = event.target.value)}
            required
            placeholder="Skriv inn fornavn"
          />
          <Form.Input
            type="text"
            label="Etternavn"
            onChange={event => (this.user.lastName = event.target.value)}
            required
            placeholder="Skriv inn etternavn"
          />
          <Form.Input
            type="password"
            label="Passord"
            className="password-input"
            onChange={event => (this.user.password = event.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
            placeholder="Passord"
          />
          <Form.Input
            type="password"
            label="Gjenta passord"
            className="password-input"
            onChange={event => (this.repeatPassword = event.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Passordet må inneholde minst én liten og én stor bokstav, og minst 8 karakterer"
            placeholder="Gjenta passord"
          />
          {this.passwordLengthOk ? <div /> : <Form.Alert type="danger" text="Du må bruke minst 8 tegn i passordet ditt" />}
          {this.passwordsMatch ? <div /> : <Form.Alert type="danger" text="Passordene samsvarer ikke. Prøv på nytt." />}
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton onclick={this.save} text="Lag Bruker"/>
            </div>
          </div>
        </form>
      </Card>
    );
  }
  mounted(){
    userService.checkActivationToken(this.props.tokenId)
      .then(user => this.user = user)
      .catch(error => console.log(error));
  }

  save() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    if (this.user.password.length < 8) {
      this.passwordLengthOk = false;
      return;
    } else {
      this.passwordLengthOk = true;
    }

    if (this.user.password !== this.repeatPassword) {
      this.passwordsMatch = false;
      return;
    } else {
      this.passwordsMatch = true;
    }

    userService
      .activateAccount(this.props.tokenId, this.user)
      .then(token => {
        tokenManager.addToken(token);
        history.push('/profil');
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}