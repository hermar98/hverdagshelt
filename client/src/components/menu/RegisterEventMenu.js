import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { userService } from '../../services/UserService';

export class RegisterEventMenu extends Component {
  user = null;

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
        <NavBar>
          <NavBar.Brand
            image={'../../images/hverdagshelt-logo-white.svg'}
            to={'/kommune/' + localStorage.getItem('munId') + '/saker'}
          >
            Hverdagshelt
          </NavBar.Brand>
          <NavBar.Button onClick={this.toRegisterEvent}>Registrer Event</NavBar.Button>
          <NavBar.Button onClick={this.toMunEmployeeHome}>Hjem</NavBar.Button>
          <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
            <DropdownHeader>{this.user.email}</DropdownHeader>
            <DropdownFooter>Kommuneansatt</DropdownFooter>
            <DropdownDivider />
            <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
            <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
          </NavBar.Dropdown>
        </NavBar>
      );
    }
    return <div />;
  }

  toProfile() {
    history.push('/profil');
  }

  toLogout() {
    tokenManager.deleteToken();
    history.push('/');
  }

  toRegisterEvent() {
    history.push('/registrerEvent');
  }
  toMunEmployeeHome() {
    history.push('/kommune/' + localStorage.getItem('munId') + '/saker'); //TODO: ansatt hjemside
  }
  toCompanyEmployeeHome() {
    history.push('/saker'); //TODO: bedrift hjemside
  }
}
