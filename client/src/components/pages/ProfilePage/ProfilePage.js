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
import { autocomplete } from '../../../../public/autocomplete';
import { User } from '../../../models';
import { Issue } from '../../../models';
import { Municipal } from '../../../models';
//import styles from './ProfilePage.css';

export class ProfilePage extends Component {
  state = {
    isLoaded: false
  };

  user: User = new User(0, '', '', '', 0, '', '');
  issues: Issue[] = [];
  municipal: Municipal = new Municipal(0, '', '', '', 0);
  municipals: Municipal[] = [];

  mounted() {
    async function f() {
      let municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then(municipals => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('municipalInput'), municipals);
    }

    f();

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

  handleChangeMunicipal(e: Object) {
    e.preventDefault();

    let json = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      rank: user.rank,
      salt: passwordData.salt,
      hash_str: passwordData.passwordHash
    };

    userService.updateUser(json);
  }

  render() {
    return (
      <div>
        <Card title="Min Profil">
          <p>
            Navn: {this.state.isLoaded && this.user.firstName} {this.state.isLoaded && this.user.lastName}
          </p>
          <p>Email: {this.state.isLoaded && this.user.email}</p>
          <p>Hjemkommune: {this.state.isLoaded && this.municipal.name}</p>
          <br />
          <form autoComplete="off">
            <div className="autocomplete">
              <input id="municipalInput" type="text" name="municipal" />
              <button value="" type="submit">
                Endre Kommune
              </button>
            </div>
          </form>
        </Card>
        <Card>
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
