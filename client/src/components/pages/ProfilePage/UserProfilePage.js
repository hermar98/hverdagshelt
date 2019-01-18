import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userMunicipalService } from '../../../services/UserMunicipalService';
import { autocomplete, glob } from '../../../../public/autocomplete';
import { User, Issue, Municipal, UserMunicipal } from '../../../models';
import {IssueSmall, IssueNormal, IssueOverviewSmall, ImageButton} from '../../issueViews/issueViews';
import { tokenManager } from '../../../tokenManager';
import {userService} from "../../../services/UserService";
import {issueService} from "../../../services/IssueService";
import {municipalService} from "../../../services/MunicipalService";

let municipalObjects;

export class UserProfilePage extends Component {
  user: User = new User();
  issues: Issue[] = [];

  newMunicipalName: string = '';
  newMunicipalId: number = 0;
  userMunicipals: Municipal[] = [];
  munId: number = -1;

  mounted() {
    async function f() {
      municipalObjects = [];
      let promise = new Promise((resolve, reject) => {
        resolve(municipalService.getMunicipals().then(municipals => (municipalObjects = municipals)));
      });

      let result = await promise;
      let municipals = result.map(e => e.name);

      autocomplete(document.getElementById('municipalInput'), municipals);
    }

    f();

    userService

      .getUser(tokenManager.getUserId())
      .then(rows => (this.user = rows))
      .catch(error => console.log(error));

    issueService

      .getIssuesByUser(tokenManager.getUserId())
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));

    userMunicipalService
      .getUserMunicipals(tokenManager.getUserId())
      .then(rows => {
        this.userMunicipals = rows;
      })
      .catch(error => console.log(error));
  }

  handleAddMunicipal() {
    let municipal = municipalObjects.find(e => e.name == glob);
    console.log(municipal);

    this.newMunicipalId = municipal.munId;
    userMunicipalService.addUserMunicipal(tokenManager.getUserId(), this.newMunicipalId);
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

  deleteUserMunicipal(userId: number, munId: number) {
    userMunicipalService
      .deleteUserMunicipal(userId, munId)
      .then(rows => (this.userMunicipals = this.userMunicipals.filter(e => e.munId !== munId)))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <MenuLoggedIn />
          <h4 className="row justify-content-center my-profile">Min Profil</h4>
        <div className="profile-page-container page-container">
          <div className="profile-left">
            <div className="profile-info">
              <Card title="Info">
                <p>
                  Navn: {this.user.firstName} {this.user.lastName}
                </p>
                <p>Email: {this.user.email}</p>
              </Card>
            </div>
              <div className="card municipal">
                  <h5 id="municipal-title">Kommuner</h5>
                    <div className="add-municipal-field justify-content-between d-flex flex-row">
                        <div cassName="autocomplete"></div>
                        <input className="form-control" id="mun-input" type="text" placeholder="Legg til kommune..." />
                        <ImageButton source="../../images/add.png" onclick={this.handleAddMunicipal}/>
                    </div>
                    <ul className="list-group mun-list">
                        {this.userMunicipals.map((mun, index) => (
                            <li className="list-group-item">{mun.name}</li>
                        ))}
                        <li className="list-group-item municipal-item"><div className="d-flex flex-row justify-content-between align-items-center"> Hello<ImageButton source="../../images/trashcan.png" onclick={
                            this.deleteUserMunicipal}/></div></li>
                    </ul>
              </div>
            <br />
            <div className="change-password-profile">
              <ChangePasswordForm />
            </div>
          </div>
          <div className="profile-issues">
            <Card className="issues" title="Dine Innmeldte Saker">
                <IssueOverviewSmall />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
