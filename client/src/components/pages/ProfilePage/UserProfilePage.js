import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService, municipalService, issueService, userMunicipalService } from '../../../services';
import { autocomplete } from '../../../../public/autocomplete';
import { User, Issue, Municipal, UserMunicipal } from '../../../models';
import { IssueSmall, IssueNormal, IssueOverviewSmall } from '../../issueViews/issueViews';

export class UserProfilePage extends Component<{ match: { params: { userId: number } } }> {
  state = {
    isLoaded: false
  };
  user: User = new User(0, '', '', '', 0, 0, '');
  issues: Issue[] = [];
  allMunicipals: Municipal[] = new UserMunicipal();
  newMunicipalName: string = '';
  newMunicipalId: number = 0;
  userMunicipals: Municipal[] = [];

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
      // .getUser(this.props.match.params.userId)
      .getUser(1)
      .then(rows => (this.user = rows))
      .catch(error => console.log(error));

    issueService
      // .getIssuesByUser(this.props.match.params.userId)
      .getIssuesByUser(1)
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));

    municipalService
      .getMunicipals()
      .then(rows => {
        this.allMunicipals = rows;
      })
      .catch(error => console.log(error));

    userMunicipalService
      .getUserMunicipals(1)
      .then(rows => {
        this.userMunicipals = rows;
        this.isLoaded = true;
      })
      .catch(error => console.log(error));
  }

  handleAddMunicipal() {
    this.newMunicipalId = this.allMunicipals.find(mun => mun.name === this.newMunicipalName).munId;

    userMunicipalService.addUserMunicipal(1, this.newMunicipalId);
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
                <input
                  id="municipalInput"
                  type="text"
                  name="municipal"
                  onChange={event => (this.newMunicipalName = event.target.value)}
                />
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
