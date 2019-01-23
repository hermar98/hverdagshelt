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

export class ProfileMenu extends Component {
  user = null;

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

  render() {
    if (this.user) {
      if (this.user.rank === 1) {
        return (
          <div>
            <NavBar>
              <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
              <NavBar.Button onClick={this.toFeed}>Min Feed</NavBar.Button>
              <NavBar.Dropdown className="focus" title={this.user.firstName + ' ' + this.user.lastName}>
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
      } else if (this.user.rank === 2) {
        return (
          <div>
            <NavBar>
              <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
              <NavBar.Button onClick={this.toCompanyHome}>Hjem</NavBar.Button>
              <NavBar.Dropdown className="focus" title={this.user.firstName + ' ' + this.user.lastName}>
                <DropdownHeader>{this.user.email}</DropdownHeader>
                <DropdownFooter>Bedrift</DropdownFooter>
                <DropdownDivider />
                <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
                <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
              </NavBar.Dropdown>
            </NavBar>
          </div>
        );
      } else if (this.user.rank === 3) {
        return (
          <div>
            <NavBar>
              <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
              <NavBar.Button onClick={this.toMunEmployeeHome}>Hjem</NavBar.Button>
              <NavBar.Dropdown className="focus" title={this.user.firstName + ' ' + this.user.lastName}>
                <DropdownHeader>{this.user.email}</DropdownHeader>
                <DropdownFooter>Kommuneansatt</DropdownFooter>
                <DropdownDivider />
                <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
                <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
              </NavBar.Dropdown>
            </NavBar>
          </div>
        );
      } else if (this.user.rank === 4) {
        return (
          <div>
            <NavBar>
              <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
              <NavBar.Button onClick={this.toAdminHome}>Hjem</NavBar.Button>
              <NavBar.Dropdown className="focus" title={this.user.firstName + ' ' + this.user.lastName}>
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
    }
    return <div />;
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
    history.push('/');
  }
  toMunEmployeeHome() {
    history.push('/kommune/' + localStorage.getItem('munId') + '/saker'); //TODO: ansatt hjemside
  }
  toCompanyEmployeeHome() {
    history.push('/saker');
  }
  toAdminHome() {
    history.push('/admin');
  }

  changeMunicipal() {
    localStorage.removeItem('munId');
    history.push('/');
  }
}
