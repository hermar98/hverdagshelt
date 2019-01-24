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

export class AdminMenu extends Component {
  user = null;
  municipal = new Municipal();
  munId = localStorage.getItem('munId');
  className = '';

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
  render() {
    if (this.user) {
      return (
        <div>
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'} to={'/admin'}>
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button onClick={this.toAdminHome}>Hjem</NavBar.Button>
            <NavBar.Dropdown className={this.className} title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Admin</DropdownFooter>
              <DropdownDivider />
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

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
  toAdminHome() {
    history.push('/admin');
    this.className = '';
  }
}
