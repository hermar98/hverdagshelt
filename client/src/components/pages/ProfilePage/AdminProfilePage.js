import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import { ProfileMenu } from '../../../components/menu/ProfileMenu';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services/UserService';
import { User } from '../../../models/User';
import { tokenManager } from '../../../tokenManager.js';
//import styles from './ProfilePage.css';

export class AdminProfilePage extends Component {
  user: User = new User();

  mounted() {
    userService
      .getUser(tokenManager.getUserId())
      .then(rows => {
        this.user = rows;
        this.state.isLoaded = true;
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <ProfileMenu />
        <Card title="Min Profil">
          <p>
            Navn: {this.user.firstName} {this.user.lastName}
          </p>
          <p>Email: {this.user.email}</p>
        </Card>
        <Card>
          <ChangePasswordForm />
        </Card>
      </div>
    );
  }
}
