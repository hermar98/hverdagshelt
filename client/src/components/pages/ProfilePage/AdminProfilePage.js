import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services/UserService';
import { User } from '../../../models/User';
import { tokenManager } from '../../../tokenManager.js';
import {IssueOverviewSmall} from "../../issueViews/issueViews";
//import styles from './ProfilePage.css';

export class AdminProfilePage extends Component {
  user: User = new User();

  mounted() {
    userService
      .getCurrentUser()
      .then(rows => {
        this.user = rows;
        this.state.isLoaded = true;
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
        <div className="container-fluid">
            <h4 className="row justify-content-center my-profile">Min Profil</h4>
            <div className="profile-page-container page-container slim-profile">
                <div className="card profile-info2">
                    <div className="card-body">
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <h5 className="card-title">Info</h5>
                            </div>
                        </div>
                        <p>
                            Navn: {this.user.firstName} {this.user.lastName}
                        </p>
                        <p>Email: {this.user.email}</p>
                    </div>
                </div>
                <br />
                <div className="change-password-profile">
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
  }
}
