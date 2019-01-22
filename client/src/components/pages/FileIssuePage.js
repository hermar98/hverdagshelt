// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import FileIssueForm from '../../components/forms/FileIssueForm';
import { IssueMenu } from '../../components/menu/IssueMenu.js';

export class FileIssuePage extends Component {
  user = new User();
  render() {
    return (
      <div>
        <IssueMenu />
        <FileIssueForm />
      </div>
    );
  }
}
