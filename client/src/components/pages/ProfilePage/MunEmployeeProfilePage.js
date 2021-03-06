import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userMunicipalService } from '../../../services/UserMunicipalService';
import { autocomplete, glob } from '../../../../public/autocomplete';
import { IssueSmall, IssueNormal, IssueOverviewSmall, ImageButton } from '../../issueViews/issueViews';
import { tokenManager } from '../../../tokenManager';
import { userService } from '../../../services/UserService';
import { issueService } from '../../../services/IssueService';
import { municipalService } from '../../../services/MunicipalService';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';
import { Municipal } from '../../../models/Municipal';

export class MunEmployeeProfilePage extends Component {
  user: User = new User();
  issues: Issue[] = [];
  municipal: Municipal = new Municipal();

  mounted() {
    userService
      .getCurrentUser()
      .then(rows =>{
        this.user = rows
        municipalService
          .getMunicipal(this.user.munId)
          .then(mun => this.municipal = mun)
          .catch(error => console.log(error));

          issueService
              .getIssuesByUser(this.user.userId)
              .then(rows => (this.issues = rows))
              .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  delete(issueId: number) {
    if (this.issues.find(e => e.issueId === issueId).statusId === 6) {
      issueService
        .deleteIssue(issueId)
        .then(rows => (this.issues = this.issues.filter(e => e.issueId !== issueId)))
        .catch(error => console.log(error));
    } else {
      console.log('Not allowed to delete this issue  ');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h4 className="row justify-content-center my-profile">Min Profil</h4>
        <div className="profile-page-container page-container">
          <div className="profile-left">
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
                <p>Kommune: {this.municipal.name} </p>
              </div>
            </div>
            <br />
            <div className="change-password-profile">
              <ChangePasswordForm />
            </div>
          </div>
          <div className="profile-issues">
            <Card className="issues" title="Dine Saker">
              <IssueOverviewSmall issues={this.issues} />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
