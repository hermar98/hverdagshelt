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
  activeProfile = '';
  activeFeed = '';
  activeIssue = '';

  mounted() {
    userService
      .getCurrentUser()
      .then(user => {
        this.user = user;
      })
      .catch((error: Error) => console.log(error));

  }
  render() {
    if (this.user) {
      return (
        <div>
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'} to="/" onClick={this.toHome}>
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className={this.activeRegIssue} onClick={this.toRegisterIssue}>
              Registrer Sak
            </NavBar.Button>
            <NavBar.Button className={this.activeFeed} onClick={this.toFeed}>
              Min Feed
            </NavBar.Button>
            <NavBar.Dropdown className={this.activeProfile} title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Privatperson</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.changeMunicipal}>Søk på kommune</DropdownItem>
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
    this.activeProfile = 'btnfocus';
    this.activeFeed = '';
    this.activeRegEvent = '';
  }

  toFeed() {
    history.push('/feed');
    this.activeFeed = 'btnfocus';
    this.activeProfile = '';
    this.activeRegIssue = '';
  }
  toHome() {
    this.activeFeed = '';
    this.activeProfile = '';
    this.activeRegIssue = '';
  }
  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }
  toRegisterIssue() {
    history.push('/registrerSak');
    this.activeRegIssue = 'btnfocus';
    this.activeFeed = '';
    this.activeProfile = '';
  }
  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
    this.activeFeed = '';
    this.activeProfile = '';
    this.activeRegIssue = '';
  }
}
