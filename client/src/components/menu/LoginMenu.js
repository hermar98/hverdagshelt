// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {
  Alert,
  NavBar,
  Form,
  Card,
  Button,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
  DropdownItem
} from '../../widgets';
import { municipalService } from '../../services/MunicipalService.js';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { Municipal } from '../../models/Municipal';
import { userService } from '../../services/UserService';

export class LoginMenu extends Component {
  user = null;

  render() {
    return (
      <NavBar>
        <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
        <NavBar.Button className="focus" onClick={this.toLogin}>
          Logg Inn
        </NavBar.Button>
        <NavBar.Button onClick={this.toRegister}>Registrer Bruker</NavBar.Button>
      </NavBar>
    );
  }

  mounted() {
    async function f() {
      let municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then((municipals: Municipal[]) => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      // autocomplete(document.getElementById('municipalInput'), municipals);
    }

    f();
      userService
        .getCurrentUser()
        .then(user => {
          this.user = user;
        })
        .catch((error: Error) => console.log(error));
  }
  async go() {
    //$FlowFixMe
    let municipalId = municipalObjects.find(e => e.name == glob).munId;
    if (municipalId) {
      localStorage.setItem('munId', municipalId.toString());
      history.push('/kommune/' + municipalId);
    }
  }

  toLogin() {
    history.push('/loggInn');
  }
  toRegister() {
    history.push('/registrer');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
}
