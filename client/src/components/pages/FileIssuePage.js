// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import FileIssueForm from '../../components/forms/FileIssueForm';

export class FileIssuePage extends Component {
  user = new User();
  render() {
    return (
      <div className="mb-4">
        <FileIssueForm />
      </div>
    );
  }
}
