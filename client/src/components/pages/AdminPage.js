import * as React from 'react';
import { Component } from 'react-simplified';
import { User } from '../../models/User.js';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import RegistrationForm from '../../components/forms/RegistrationForm';
import { NewMenu } from '../menu/NewMenu';
import { userService } from '../../services/UserService.js';

export class AdminPage extends Component {
    users = [];

    render() {
        return (
            <div>
                <NewMenu />
                <div className="card m-3">
                    <div className="card-body">
                        <h2 className="card-title mb-3">Administrer brukere</h2>
                        <div className="col">
                            <label htmlFor="selectType">Type bruker</label>
                            <select className="form-control m-sm-2" id="selectType">
                                <option>Default select</option>
                            </select>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Fornavn</th>
                                    <th scope="col">Etternavn</th>
                                    <th scope="col">E-post</th>
                                    <th scope="col">Type bruker</th>
                                    <th scope="col">Kommune</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.users.map(user => (
                                    <tr>
                                        <th scope="row">{user.userId}</th>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rank}</td>
                                        <td>{user.munId ? (user.munId) : (' - ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        userService.getUsers()
            .then(users => {
                this.users = users.map(user => {
                    if (user.rank === 1) {
                        user.rank = 'Privatperson';
                    } else if (user.rank === 2) {
                        user.rank = 'Bedrift';
                    } else if (user.rank === 3) {
                        user.rank = 'Kommuneansatt';
                    } else if (user.rank === 4) {
                        user.rank = 'Admin';
                    }
                    return user;
                })
            })
            .catch((error: Error) => Alert.danger(error.message));
    }
}