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

export class UserMenu extends Component {
  user = null;
  municipal = new Municipal();
  munId = localStorage.getItem('munId');
  className = '';
  className2 = '';

  mounted() {
    userService
      .getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch((error: Error) => console.log(error));

    municipalService
      .getMunicipal(this.munId)
      .then(municipal => (this.municipal = municipal))
      .catch((error: Error) => console.log(error));
  }
  render() {
    if (this.user) {
      return (
        <div>
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'} to="/feed" onClick={this.toHome2}>
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button onClick={this.toRegisterIssue}>Registrer Sak</NavBar.Button>
            <NavBar.Button className2={this.className2} onClick={this.toFeed}>
              Min Feed
            </NavBar.Button>
            <NavBar.Dropdown className={this.className} title={this.user.firstName + ' ' + this.user.lastName}>
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
    return <div />;
  }
  toProfile() {
    history.push('/profil');
    this.className = 'profilefocus';
    this.className2 = '';
  }

  toFeed() {
    history.push('/feed');
    this.className = '';
  }
  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }
  toRegisterIssue() {
    history.push('/registrerSak');
    this.className = '';
    this.className2 = '';
  }
  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }

  toIssue() {
    history.push('/registrerSak');
    this.className = '';
    this.className2 = '';
  }
  toHome2() {
    this.className = '';
    this.className2 = 'homefocus';
    console.log(this.className2);
  }
}
