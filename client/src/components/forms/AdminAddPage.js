// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { userService } from '../../services/UserService.js';
import { history } from '../../index.js';
import {municipalService} from "../../services/MunicipalService";
import {Municipal} from "../../models/Municipal";
import {autocomplete, glob} from "../../../public/autocomplete";

let municipalObjects;

export default class RegistrationForm extends Component {
  user = new User();
  repeatPassword = '';
  passwordLengthOk = true;
  passwordsMatch = true;
  emailRegistered = false;
  form = null;
  munEmployee = false;
  municipals = [];

  render() {
    return (
      <Card title="Registrer ny bruker">
        <form ref={e => (this.form = e)} onSubmit={e => e.preventDefault()}>
          <Form.Input
            type="email"
            label="E-post"
            onChange={event => (this.user.email = event.target.value)}
            required
            placeholder="Skriv inn epost"
          />
          <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
              <label>Brukertype</label>
              <select
                required
                className="form-control"
                value={this.user.rank}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  this.handleChange(e);
                }
                }
              >
                <option value={1}>Privatbruker</option>
                <option value={2}>Bedriftsbruker</option>
                <option value={3}>Kommuneansatt</option>
              </select>
            </div>
          </div>
          {this.munEmployee ? <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
              <label>Velg kommune</label>
              <select
                required
                className="form-control"
                value={this.user.rank}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => this.user.munId = parseInt(e.target.value)}>
                {this.municipals.map(mun =>
                  <option key={mun.munId} value={mun.munId}>{mun.name}</option>
                )}
              </select>
            </div>
          </div>
            : <div></div>
          }
          {this.emailRegistered ? <Form.Alert text="E-posten er allerede registrert" /> : <div />}
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic onClick={this.save}>Lag bruker</Button.Basic>
            </div>
          </div>
        </form>
      </Card>
    );
  }
  save() {
    if (!this.form || !this.form.checkValidity()) {
      return;
    }

    userService
      .addUser(this.user)
      .then(() => history.push('/admin'))
      .catch((error: Error) => {
        console.log(error);
        this.emailRegistered = true;
      });
  }

  handleChange(e: SyntheticInputEvent<HTMLInputElement>){
    if (this.user) this.user.rank = parseInt(e.target.value);
    if(this.user.rank === 3){
      this.munEmployee = true;
    }else{
      this.munEmployee = false;
    }
  }

  mounted() {
    municipalService
      .getMunicipals()
      .then(municipals => {
        this.municipals = municipals;
        console.log(this.municipals);
        this.municipals.sort(function(a,b){
          return a.name.localeCompare(b.name);
        })
      })
      .catch(error => console.log(error));
  }
}