import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert, NavBar, Form, Card, Button } from '../../../widgets';
import MenuLoggedIn from '../../../components/menu/Menu.js';
import ChangePasswordForm from '../../../components/forms/ChangePasswordForm';
import { userService } from '../../../services';
import { issueService } from '../../../services';
import { municipalService } from '../../../services';
import { autocomplete } from '../../../../public/autocomplete';
import { User } from '../../../models';
import { Issue } from '../../../models';
import { Municipal } from '../../../models';
import { IssueSmall, IssueNormal, IssueOverviewSmall } from '../../issueViews/issueViews';

export class UserProfilePage extends Component {
  user: User = new User(0, '', '', '', 0, 0, '');
  issues: Issue[] = [];
  municipal: Municipal = new Municipal(0, '', '', '', 0);
  newMunicipal: Municipal = new Municipal(0, '', '', '', 0);
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
      .then(rows => (this.user = rows))
      .catch(error => console.log(error));

    issueService
      .getIssues()
      .then(rows => (this.issues = rows))
      .catch(error => console.log(error));

    municipalService
      .getMunicipals()
      .then(rows => {
        this.municipals = rows;
        this.municipal = rows.find(mun => mun.mun_id === this.user.munId);
      })
      .catch(error => console.log(error));
  }

  handleChangeMunicipal(e: Object) {
    e.preventDefault();

    this.user.mun_id = this.municipals.find(mun => mun.name === this.newMunicipal).munId;

    userService.updateUser(this.user);
  }

  delete(issue_id: number) {
    if (this.issues.find(e => e.issueId === issue_id).status === 6) {
      issueService
        .deleteIssue(issue_id)
        .then(rows => (this.issues = this.issues.filter(e => e.issueId !== issue_id)))
        .catch(error => console.log(error));
    } else {
      console.log('Not allowed to delete this issue');
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
              <p>Hjemkommune: {this.municipal.name}</p>
            </div>
          </Card>
          <br />
          <div>
            <form autoComplete="off" onSubmit={this.handleChangeMunicipal.bind(this)}>
              <div className="autocomplete">
                <input
                  id="municipalInput"
                  type="text"
                  name="municipal"
                  onChange={event => (this.newMunicipal = event.target.value)}
                />
                <button type="submit">Endre Kommune</button>
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
              <IssueSmall issue={issue} />
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
