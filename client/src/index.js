// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert , NavBar, Form, Card, Button} from './widgets';
import { studentService, User } from './services';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
        <NavBar>
          <NavBar.Brand image="images/Trondheim_kommune.png">Trondheim Kommune</NavBar.Brand>
          <NavBar.Link to="/">Home</NavBar.Link>
          <NavBar.Link to="/register">Registrer bruker</NavBar.Link>
        </NavBar>
    );
  }
}

class Register extends Component {
    user = new User();

  render() {
    return(
        <Card title="Registrer ny bruker">
            <Form.Input
                type="text"
                label="Fornavn: "
                onChange={event => (this.user.firstName = event.target.value)}
                required
                placeholder="Skriv inn fornavn"/>
            <Form.Input
                type="text"
                label="Etternavn: "
                onChange={event => (this.user.lastName = event.target.value)}
                required
                placeholder="Skriv inn etternavn"/>
           <Form.Input
               type="text"
               label="Email: "
               onChange={event => (this.user.email = event.target.value)}
               required
               placeholder="Skriv inn epost"/>
            <Form.Input
                type="password"
                label="Passord: "
                onChange={} //TODO
                required
                placeholder="Passord"/>
            <Form.Input
                type="password"
                required
                placeholder="Gjenta passord"/>
            <Button.Success onClick={this.save}>Create user</Button.Success>
        </Card>

    );
  }
  save(){
    userService
        .addUser(this.user)
        .then(() => history.push('/home'))
        .catch((error: Error) => Alert.danger(error.message));
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/register" component={Register} />
      </div>
    </HashRouter>,
    root
  );

