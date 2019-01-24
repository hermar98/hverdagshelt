// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Issue } from '../../models/Issue.js';
import { issueCategoryService } from '../../services/IssueCategoryService.js';
import { Alert, Form, Card, Button } from '../../widgets';
import { history } from '../../index';
import { tokenManager } from '../../tokenManager';
import { userService } from '../../services/UserService';
import UploadImageButton from '../image/UploadImageButton';
import {HoverButton} from "../issueViews/issueViews";

export default class RegisterIssue extends Component {
  issue = new Issue();
  categories = [];
  form = null;
  munId = localStorage.getItem('munId');
  upload: UploadImageButton = null;
  user = null;

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
          <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
              <select
                required
                className="form-control"
                value={this.issue.categoryId || ''}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.issue) this.issue.categoryId = parseInt(e.target.value);
                }}
              >
                <option disabled selected value="">
                  Velg kategori..
                </option>
                {this.categories.map(cat => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Form.InputLarge
            type="text"
            onChange={event => (this.issue.content = event.target.value)}
            required
            placeholder="Skriv innholdet i saken"
          />
          <UploadImageButton
            ref={boy => {
              this.upload = boy;
            }}
          />
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <HoverButton onclick={this.save} text="Send Inn"/>
            </div>
          </div>
        </form>
      </Card>
    );
  }

  save() {
    if (!this.form || !this.form.checkValidity()) return;

    this.issue.userId = this.user.userId;
    this.issue.munId = this.munId;
    this.issue.latitude = 0.1;
    this.issue.longitude = 0.2;
    this.issue.image = '';

    this.upload.printFaenHode(this.issue);
  }

  mounted() {
    userService.getCurrentUser()
        .then(user => this.user = user)
        .catch((error: Error) => Alert.danger(error.message));

    issueCategoryService
      .getCategories()
      .then(issueCategories => (this.categories = issueCategories))
      .then(() => console.log(this.categories))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
