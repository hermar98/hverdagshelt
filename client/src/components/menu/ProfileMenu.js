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
import { Municipal } from '../../models';
import { userService } from '../../services/UserService';

export class ProfileMenu extends Component {
  user = null;
  municipal = new Municipal();
  munId = localStorage.getItem('munId');

  render() {
    if (this.user) {
      return (
        <div>
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt.svg'}>Hverdagshelt</NavBar.Brand>
            <NavBar.Button onClick={this.toFeed}>Min Feed</NavBar.Button>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Privatperson</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.changeMunicipal}>Endre kommune</DropdownItem>
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        </div>
      );
    }
    return (
      <div>
        <p>hei</p>
      </div>
    );
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
    history.push('/profile');
  }

  toLogout() {
    tokenManager.deleteToken();
    history.push('/login');
  }

  toFeed() {
    history.push('/feed');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
}
