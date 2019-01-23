import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar, DropdownHeader, DropdownFooter, DropdownDivider, DropdownItem } from '../../widgets';
import { tokenManager } from '../../tokenManager';
import { history } from '../../index';
import { userService } from '../../services/UserService';

export class ChooseMunicipalPageMenu extends Component {
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
    {
      console.log(this.user);
    }
    if (this.user) {
      if (this.user.rank === 1) {
        return (
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
            <NavBar.Button onClick={this.toFeed}>Min Feed</NavBar.Button>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Privatperson</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        );
      } else if (this.user.rank === 2) {
        return (
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
            <NavBar.Button onClick={this.toCompanyHome}>Hjem</NavBar.Button>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Bedrift</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        );
      } else if (this.user.rank === 3) {
        return (
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
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
      } else if (this.user.rank === 4) {
        return (
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
            <NavBar.Button onClick={this.toAdminHome}>Hjem</NavBar.Button>
            <NavBar.Dropdown title={this.user.firstName + ' ' + this.user.lastName}>
              <DropdownHeader>{this.user.email}</DropdownHeader>
              <DropdownFooter>Admin</DropdownFooter>
              <DropdownDivider />
              <DropdownItem onClick={this.toProfile}>Min profil</DropdownItem>
              <DropdownItem onClick={this.toLogout}>Logg ut</DropdownItem>
            </NavBar.Dropdown>
          </NavBar>
        );
      } else {
        return (
          <NavBar>
            <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>
              Må sjekke email for aktivering av konto!!!
            </NavBar.Brand>
            <NavBar.Button onClick={this.toLogin}>Logg Inn</NavBar.Button>
            <NavBar.Button onClick={this.toRegister}>Registrer Bruker</NavBar.Button>
          </NavBar>
        );
      }
    } else {
      return (
        <NavBar>
          <NavBar.Brand image={'../../images/hverdagshelt-logo-white.svg'}>Hverdagshelt</NavBar.Brand>
          <NavBar.Button onClick={this.toLogin}>Logg Inn</NavBar.Button>
          <NavBar.Button onClick={this.toRegister}>Registrer Bruker</NavBar.Button>
        </NavBar>
      );
    }
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
    history.push('/saker'); //TODO: bedrift hjemside
  }
  toAdminHome() {
    history.push('/'); //TODO: admin hjemside
  }
}
