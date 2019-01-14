// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models.js';
import FileIssueForm from '../../components/forms/FileIssueForm';
import MenuLoggedIn from '../../components/menu/Menu.js';


export class FileIssuePage extends Component {
    user = new User()
    render() {
        return (
            <div>
                <MenuLoggedIn />
                <FileIssueForm />
            </div>
        );
    }

}