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

export class NewMenu extends Component {
  user = null;
  municipal = new Municipal();
  munId = localStorage.getItem('munId');

  navbar() {
    if (this.user !== null) {
      return (
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt.svg'}>Hverdagshelt</NavBar.Brand>
          <NavBar.Button onClick={this.toFeed}>Min Feed</NavBar.Button>
          <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
            <DropdownHeader>{this.user.email}</DropdownHeader>
            <DropdownFooter>Privatperson</DropdownFooter>
            <DropdownDivider />
            <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
            <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
          </NavBar.Dropdown>
        </NavBar>
      );
    } else {
      return (
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt.svg'}>Hverdagshelt</NavBar.Brand>
          <NavBar.Button onClick={this.toLogin}>Logg Inn</NavBar.Button>
          <NavBar.Button onClick={this.toRegister}>Registrer Bruker</NavBar.Button>
        </NavBar>
      );
    }
  }

  render() {
    return <div>{this.navbar()}</div>;
  }

  mounted() {
    userService
      .getToken()
      .then(() => {
        userService
          .getUser(tokenManager.getUserId())
          .then(user => {
            this.user = user;
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));

    municipalService
      .getMunicipal(this.munId)
      .then(municipal => (this.municipal = municipal))
      .catch((error: Error) => console.log(error));
  }

  toProfile() {
    history.push('/profil');
  }

  toFeed() {
    history.push('/feed');
  }

  toLogin() {
    history.push('/login');
  }
  toRegister() {
    history.push('/register');
  }
  toLogout() {
    tokenManager.deleteToken();
    history.push('/login');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
}
