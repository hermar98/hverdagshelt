import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userMunicipalService } from '../../../services/UserMunicipalService';
import { autocomplete, glob } from '../../../../public/autocomplete';
import { User, Issue, Municipal, UserMunicipal } from '../../../models';
import { IssueSmall, IssueNormal, IssueOverviewSmall } from '../../issueViews/issueViews';
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
        <Card title="Min Profil">
          <Card title="">
            <div className="info">
              <p>
                Navn: {this.user.firstName} {this.user.lastName}
              </p>
              <p>Email: {this.user.email}</p>
              <p>Kommuner:</p>
              <Card>
                {this.userMunicipals.map((mun, index) => (
                  <p key={index}>
                    {mun.name}
                    <button onClick={this.deleteUserMunicipal.bind(this, this.user.userId, mun.munId)}>Slett</button>
                  </p>
                ))}
              </Card>
            </div>
          </Card>
          <br />
          <div>
            <form autoComplete="off">
              <div className="autocomplete">
                <input id="municipalInput" type="text" name="municipal" />
                <button type="submit" onClick={this.handleAddMunicipal}>
                  Legg Til Kommune
                </button>
              </div>
            </form>
          </div>
        </Card>
        <Card title="">
          <ChangePasswordForm />
        </Card>
        <Card className="issues" title="Mine Saker">
          {this.issues.map((issue, index) => (
            <div key={index}>
              <IssueNormal issue={issue} />
              <button className="btn btn-danger" onClick={this.delete.bind(this, issue.issueId)}>
                Delete
              </button>
            </div>
          ))}
        </Card>
      </div>
    );
  }
}
