// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../services';
import FileIssueForm from '../../components/forms/FileIssueForm';

export class FileIssuePage extends Component {
    user = new User();

    render() {
        return (
            <div>
                <FileIssueForm />
            </div>
        );
    }
}