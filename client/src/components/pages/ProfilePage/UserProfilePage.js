import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userMunicipalService } from '../../../services/UserMunicipalService';
import { autocomplete, glob } from '../../../../public/autocomplete';
import { UserMunicipal } from '../../../models/UserMunicipal';
import { IssueSmall, IssueNormal, IssueOverviewSmall, ImageButton } from '../../issueViews/issueViews';
import { tokenManager } from '../../../tokenManager';
import { userService } from '../../../services/UserService';
import { issueService } from '../../../services/IssueService';
import { municipalService } from '../../../services/MunicipalService';
import { User } from '../../../models/User';
import { Issue } from '../../../models/Issue';

let municipalObjects;
let sharedMunicipals = sharedComponentData({ municipals: [] });

export class UserProfilePage extends Component {
  user: User = new User();
  issues: Issue[] = [];

  newMunicipalName: string = '';
  newMunicipalId: number = 0;
  munId: number = -1;

  mounted() {
    async function f() {
      municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then(municipals => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('munInputForm-Input'), municipals);
    }

    f();

    userService
      .getCurrentUser()
      .then(rows => {
          this.user = rows;
          issueService
              .getIssuesByUser(this.user.userId)
              .then(rows => (this.issues = rows))
              .catch(error => console.log(error));
          userMunicipalService
              .getUserMunicipals(this.user.userId)
              .then(rows => {
                  sharedMunicipals.municipals = rows;
              })
              .catch(error => console.log(error));
      }).catch(error => console.log(error));
  }

  handleAddMunicipal() {
    let municipal = municipalObjects.find(e => e.name == this.newMunicipalName);
    if (municipal == null) {
      municipal = municipalObjects.find(e => e.name == glob);
    }

    if (municipal != null) {
      this.newMunicipalId = municipal.munId;
      userMunicipalService.addUserMunicipal(this.user.userId, this.newMunicipalId);
      sharedMunicipals.municipals.push(municipal);
      this.newMunicipalName = '';
    }
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

  deleteUserMunicipal(munId: number) {
    userMunicipalService
      .deleteUserMunicipal(this.user.userId, munId)
      .then(rows => (sharedMunicipals.municipals = sharedMunicipals.municipals.filter(e => e.munId !== munId)))
      .catch(error => console.log(error));
  }

  render() {
    sharedMunicipals.municipals.sort((a, b) => a.name > b.name);

    return (
      <div className="container-fluid">
        <h4 className="row justify-content-center my-profile">Min Profil</h4>
        <div className="profile-page-container page-container">
          <div className="profile-left">
            <div className="card profile-info">
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
            <div className="card  municipal">
              <h5 id="municipal-title">Kommuner</h5>
              <div className="card municipal-2">
                <div className="add-municipal-field d-flex flex-row justify-content-between">
                  <input
                    className="form-control mun-input"
                    id="munInputForm-Input"
                    type="text"
                    value={this.newMunicipalName}
                    placeholder="Legg til kommune..."
                    onChange={event => (this.newMunicipalName = event.target.value)}
                  />
                  <ImageButton source="../../images/add.png" onclick={() => this.handleAddMunicipal()} />
                </div>
                <ul className="list-group mun-list">
                  {sharedMunicipals.municipals.map((mun, index) => (
                    <li className="list-group-item municipal-item">
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        {' '}
                        {mun.name}
                        <ImageButton
                          source="../../images/trashcan.png"
                          onclick={() => this.deleteUserMunicipal(mun.munId)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <br />
            <div className="change-password-profile">
              <ChangePasswordForm />
            </div>
          </div>
          <div className="profile-issues">
            <Card className="issues" title="Dine Innmeldte Saker">
              <IssueOverviewSmall issues={this.issues} />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
