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
            <NavBar.Brand
              image={'../../images/hverdagshelt-logo-white.svg'}
              to={'/kommune/' + this.user.munId}
              onClick={this.toMunEmployeeHome2}
            >
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className2={this.className2} onClick={this.toMunEmployeeHome}>
              Hjem
            </NavBar.Button>
            <NavBar.Button onClick={this.toRegisterEvent}>Registrer Event</NavBar.Button>
            <NavBar.Button onClick={this.toManageIssues}>Administrer Saker</NavBar.Button>
            <NavBar.Dropdown className={this.className} title={this.user.firstName + ' ' + this.user.lastName}>
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
    this.className = 'profilefocus';
    this.className2 = '';
  }

  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }

  toRegisterEvent() {
    history.push('/registrerEvent');
    this.className = '';
    this.className2 = '';
  }
  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
  toMunEmployeeHome() {
    history.push('/kommune/' + this.user.munId);
    this.className = '';
  }

  toManageIssues() {
    history.push('/kommune/' + this.user.munId + '/saker');
    this.className = '';
    this.className2 = '';
  }
  toMunEmployeeHome2() {
    this.className = '';
    this.className2 = 'homefocus';
    console.log(this.className2);
  }
}
