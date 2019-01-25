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

export class MunEmployeeMenu extends Component {
  user = null;
  municipal = new Municipal();
  activeProfile = '';
  activeHome = '';
  activeRegEvent = '';
  activeAdmIssues = '';
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
            <NavBar.Brand
              image={'../../images/hverdagshelt-logo-white.svg'}
              to={'/kommune/' + this.user.munId}
              onClick={this.toMunEmployeeHome2}
            >
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className={this.activeHome} onClick={this.toMunEmployeeHome}>
              Hjem
            </NavBar.Button>
            <NavBar.Button className={this.activeRegEvent} onClick={this.toRegisterEvent}>
              Registrer Event
            </NavBar.Button>
            <NavBar.Button className={this.activeAdmIssues} onClick={this.toManageIssues}>
              Administrer Saker
            </NavBar.Button>
            <NavBar.Dropdown className={this.activeProfile} title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Kommuneansatt</DropdownFooter>
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
    this.activeProfile = 'btnfocus';
    this.activeHome = '';
    this.activeRegEvent = '';
    this.activeAdmIssues = '';
  }

  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }

  toRegisterEvent() {
    history.push('/registrerEvent');
    this.activeRegEvent = 'btnfocus';
    this.activeHome = '';
    this.activeProfile = '';
    this.activeAdmIssues = '';
  }
  toMunEmployeeHome() {
    history.push('/kommune/' + this.user.munId);
    this.activeHome = 'btnfocus';
    this.activeProfile = '';
    this.activeRegEvent = '';
    this.activeAdmIssues = '';
  }
  toMunEmployeeHome2() {
    this.activeHome = 'btnfocus';
    this.activeProfile = '';
    this.activeRegEvent = '';
    this.activeAdmIssues = '';
  }

  toManageIssues() {
    history.push('/kommune/' + this.user.munId + '/saker');
    this.activeAdmIssues = 'btnfocus';
    this.activeHome = '';
    this.activeProfile = '';
    this.activeRegEvent = '';
  }
}
