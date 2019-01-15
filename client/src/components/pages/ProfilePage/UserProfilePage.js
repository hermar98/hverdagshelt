import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services';
import { issueService } from '../../../services';
import { userMunicipalService } from '../../../services';
import { municipalService } from '../../../services';
import { autocomplete } from '../../../../public/autocomplete';
import { User } from '../../../models';
import { Issue } from '../../../models';
import { Municipal } from '../../../models';
import { UserMunicipal } from '../../../models';
import { IssueSmall, IssueNormal, IssueOverviewSmall } from '../../issueViews/issueViews';

export class UserProfilePage extends Component<{ match: { params: { userId: number } } }> {
  user: User = new User(0, '', '', '', 0, 0, '');
  issues: Issue[] = [];
  municipal: UserMunicipal = new UserMunicipal();
  newMunicipal: Municipal = new Municipal(0, '', '', '', 0);
  municipals: UserMunicipal[] = [];

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
      .getUser(this.props.match.params.userId)
      .then(rows => (this.user = rows))
      .catch(error => console.log(error));

    issueService
      .getIssuesByUser(this.props.match.params.userId)
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));

    userMunicipalService
      .getUserMunicipals(1)
      .then(rows => {
        this.municipals = rows;
      })
      .catch(error => console.log(error));
  }

  handleAddMunicipal(e: Object) {
    e.preventDefault();

    //this.user.munId = this.municipals.find(mun => mun.name === this.newMunicipal).munId;

    userMunicipalService.addUserMunicipal(1, 514);
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
      <div>
        <MenuLoggedIn />
        <Card title="Min Profil">
          <Card title="">
            <div className="info">
              <p>
                Navn: {this.user.firstName} {this.user.lastName}
              </p>
              <p>Email: {this.user.email}</p>

              {console.log(this.municipals)}
            </div>
          </Card>
          <br />
          <div>
            <form autoComplete="off" onSubmit={this.handleAddMunicipal.bind(this)}>
              <div className="autocomplete">
                <input
                  id="municipalInput"
                  type="text"
                  name="municipal"
                  onChange={event => (this.newMunicipal = event.target.value)}
                />
                <button type="submit">Legg Til Kommune</button>
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
