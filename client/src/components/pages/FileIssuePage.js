// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { studentService, User } from '../../services';
import FileIssueForm from '../../components/forms/FileIssueForm';
import Menu from '../../components/menu/Menu.js';

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