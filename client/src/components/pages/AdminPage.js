import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { NewMenu } from '../menu/NewMenu';

export class AdminPage extends Component {
    user = new User();

    render() {
        return (
            <div>
                <NewMenu />
            </div>
        );
    }
}