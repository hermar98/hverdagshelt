// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import Menu from '../../components/menu/Menu.js';
import ChangePasswordForm from '../../components/forms/ChangePasswordForm';
import { userService } from '../../services';
import { issueService } from '../../services';
import { User } from '../../models';

export class ProfilePage extends Component {
  user: User = new User(0, '', '', '', 0, '', '');
  issues: Issue[] = [];

  mounted() {
    userService
      .getUser(1)
      .then(rows => (this.user = rows[0]))
      .catch(error => console.log(error));

    issueService
      .getIssues()
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Card title="Min Profil">
          <p>
            Navn: {this.user.firstName}
            {this.user.lastName}
          </p>
          <p>Email: </p>
          <p>Hjemkommune: </p>
          <label>Endre Hjemkommune</label>

          <ChangePasswordForm />
        </Card>
      </div>
    );
  }
}
