// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import LoginForm from '../../components/forms/LoginForm';
import { IssueOverviewNormal } from '../../components/issueViews/issueViews.js';
import NewMenu from '../../components/menu/Menu.js';

export class IssuePage extends Component {
  render() {
    return (
      <div>
        <NewMenu />
        <IssueOverviewNormal />
      </div>
    );
  }
}