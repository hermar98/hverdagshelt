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

  navbar() {
    if (this.user !== null) {
      return (
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
            <NavBar.Button onClick={this.toIssue}>Registrer sak</NavBar.Button>
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
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
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
  }

  toProfile() {
    history.push('/profil');
  }

  toFeed() {
    history.push('/feed');
  }

  toLogin() {
    history.push('/loggInn');
  }
  toRegister() {
    history.push('/registrer');
  }
  toLogout() {
    tokenManager.deleteToken();
    history.push('/loggInn');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }

  toIssue () {
    history.push("/registrerSak")
  }
}
