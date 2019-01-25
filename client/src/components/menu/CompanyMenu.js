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

export class CompanyMenu extends Component {
  user = null;

  activeProfile = '';
  activeMyIssues = 'btnfocus';

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
              to={'/saker'}
              onClick={this.toCompanyHome2}
            >
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className={this.activeMyIssues} onClick={this.toCompanyHome}>
              Mine Saker
            </NavBar.Button>
            <NavBar.Dropdown className={this.activeProfile} title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Bedrift</DropdownFooter>
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
    this.activeMyIssues = '';
  }
  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }
  toCompanyHome() {
    history.push('/saker');
    this.activeMyIssues = 'btnfocus';
    this.activeProfile = '';
  }
  toCompanyHome2() {
    this.activeMyIssues = 'btnfocus';
    this.activeProfile = '';
  }
}
