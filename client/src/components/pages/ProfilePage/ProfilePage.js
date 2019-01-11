// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import Menu from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services';
import { issueService } from '../../../services';
import { municipalService } from '../../../services';
import { User } from '../../../models';
import { Issue } from '../../../models';
import { Municipal } from '../../../models';
//import './ProfilePage.css';

export class ProfilePage extends Component {
  state = {
    isLoaded: false
  };

  user: User = new User(0, '', '', '', 0, '', '');
  issues: Issue[] = [];
  municipal: Municipal = new Municipal(0, '', '', '', 0);
  municipals: Municipal[] = [];

  mounted() {
    userService
      .getUser(1)
      .then(rows => {
        this.user = rows;
        this.state.isLoaded = true;
      })
      .catch(error => console.log(error));

    issueService
      .getIssues()
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));

    municipalService
      .getMunicipals()
      .then(rows => ((this.municipal = rows[0]), (this.municipals = rows)))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Card className="infoCard" title="Min Profil">
          <p>
            Navn: {this.state.isLoaded && this.user.firstName} {this.state.isLoaded && this.user.lastName}
          </p>
          <p>Email: {this.state.isLoaded && this.user.email}</p>
          <p>Hjemkommune: {this.state.isLoaded && this.municipal.name}</p>
          <br />
          <label>Endre Hjemkommune</label>
          <select className="custom-select custom-select-lg mb-3" id="sel1" value={this.municipal.name}>
            {this.municipals.map((municipal, index) => (
              <option key={index}>{municipal.name}</option>
            ))}
          </select>
          <ChangePasswordForm />
        </Card>
        <Card className="issues" title="Mine Saker">
          <ul>
            {this.issues.map((issue, index) => (
              <li key={index}>
                <p>{issue.title}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  }
}
