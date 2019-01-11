// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Issue} from '../../models.js';
import { issueService, issueCategoryService } from "../../services.js"
import { Alert, Form, Card, Button } from '../../widgets';
import { history } from "../../index";

export default class RegisterIssue extends Component {
  issue = new Issue();
  form = null;

  render() {
    return (
      <Card title="Registrer sak">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            onChange={event => (this.issue.title = event.target.value)}
            required
            placeholder="Skriv en passende tittel"
          />
          <Form.IssueCatDropdown onChange={this.save}/>
          <Form.InputLarge
            type="text"
            onChange={event => (this.issue.content = event.target.value)}
            required
            placeholder="Skriv innholdet i saken"
          />
          <Form.FileInput>Legg til bilde</Form.FileInput>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic onClick={this.save}>Send inn</Button.Basic>
            </div>
          </div>
        </form>
      </Card>
    );
  }

  save() {
    if (!this.form || this.form.checkValidity()) return;

    this.issue.latitude = 0.1;
    this.issue.longitude = 0.2;
    this.issue.image = 'hei';

    issueService
      .addIssue(this.issue)
      .then(() => history.push('/issues/' + this.issue.issueId))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
