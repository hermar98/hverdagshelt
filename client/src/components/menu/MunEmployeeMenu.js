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
  activeProfile = '';
  activeMunPage = 'btnfocus';
  activeRegEvent = '';
  activeAdmIssues = '';
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
            <NavBar.Brand
              image={'../../images/hverdagshelt-logo-white.svg'}
              to={'/kommune/' + this.user.munId}
              onClick={this.toMunPage2}
            >
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className={this.activeMunPage} onClick={this.toMunPage}>
              Kommuneside
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
    this.activeMunPage = '';
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
    this.activeMunPage = '';
    this.activeProfile = '';
    this.activeAdmIssues = '';
  }
  toMunPage() {
    history.push('/kommune/' + this.user.munId);
    this.activeMunPage = 'btnfocus';
    this.activeProfile = '';
    this.activeRegEvent = '';
    this.activeAdmIssues = '';
  }
  toMunPage2() {
    this.activeMunPage = 'btnfocus';
    this.activeProfile = '';
    this.activeRegEvent = '';
    this.activeAdmIssues = '';
  }

  toManageIssues() {
    history.push('/kommune/' + this.user.munId + '/saker');
    this.activeAdmIssues = 'btnfocus';
    this.activeMunPage = '';
    this.activeProfile = '';
    this.activeRegEvent = '';
  }
}
