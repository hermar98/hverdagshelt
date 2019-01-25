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

  activeProfile = '';
  activeAdmUsers = 'btnfocus';
  activeAdmCat = '';

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
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'} to={'/admin'} onClick={this.toAdmUsers2}>
              Hverdagshelt
            </NavBar.Brand>
            <NavBar.Button className={this.activeAdmUsers} onClick={this.toAdmUsers}>
              Administrer Brukere
            </NavBar.Button>
            <NavBar.Button className={this.activeAdmCat} onClick={this.toManageCategories}>
              Administrer Kategorier
            </NavBar.Button>
            <NavBar.Dropdown className={this.activeProfile} title={this.user.firstName + ' ' + this.user.lastName}>
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
    this.activeProfile = 'btnfocus';
    this.activeAdmUsers = '';
    this.activeAdmCat = '';
  }

  toLogout() {
    tokenManager.deleteToken();
    window.location.reload();
    history.push('/');
  }

  toAdmUsers() {
    history.push('/admin');
    this.activeAdmUsers = 'btnfocus';
    this.activeProfile = '';
    this.activeAdmCat = '';
  }
  toAdmUsers2() {
    this.activeAdmUsers = 'btnfocus';
    this.activeProfile = '';
    this.activeAdmCat = '';
  }
  toManageCategories() {
    history.push('/admin/administerKategorier');
    this.activeAdmCat = 'btnfocus';
    this.activeAdmUsers = '';
    this.activeProfile = '';
  }
}
