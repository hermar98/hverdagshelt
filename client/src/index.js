// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert , NavBar, Form, Card, Button} from './widgets';
import { studentService, User, userService, Issue} from './services';

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
          <NavBar.Link to="/registerIssue">Registrer sak</NavBar.Link>
            <NavBar.Link to="/login">Logg inn</NavBar.Link>
          <NavBar.Link to="/registerUser">Registrer bruker</NavBar.Link>
        </NavBar>
    );
  }
}

class RegisterUser extends Component {
    user = new User();

  render() {
    return(
        <Card title="Registrer ny bruker">
            <Form.Input
                type="text"
                onChange={event => (this.user.firstName = event.target.value)}
                required
                placeholder="Skriv inn fornavn"/>
            <Form.Input
                type="text"
                onChange={event => (this.user.lastName = event.target.value)}
                required
                placeholder="Skriv inn etternavn"/>
           <Form.Input
               type="text"
               onChange={event => (this.user.email = event.target.value)}
               required
               placeholder="Skriv inn epost"/>
            <Form.Input
                type="password"
                onChange={this.save} //TODO
                required
                placeholder="Passord"/>
            <Form.Input
                type="password"
                required
                placeholder="Gjenta passord"/>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                        <Button.Basic onClick={this.save}>Lag bruker</Button.Basic>
                </div>
            </div>
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

class Login extends Component{
    render() {
        return(
            <Card title="Logg inn">
                <Form.Input
                    type="text"
                    onChange={event => (this.user.firstName = event.target.value)}
                    required
                    placeholder="Skriv inn epost"/>
                <Form.Input
                    type="password"
                    onChange={event => (this.user.firstName = event.target.value)}
                    required
                    placeholder="Skriv inn passord"/>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <Button.Basic onClick={this.save}>Logg inn</Button.Basic>
                    </div>
                </div>
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center">
                        <Button.Link onClick={this.goTo}>Glemt passord</Button.Link>
                    </div>
                </div>
            </Card>
        );
    }

    goTo() {
        history.push('/sendEmail')
    }
}

class RegisterIssue extends Component {
    issue = new Issue();

    render() {
        return (
            <Card title="Registrer sak">
                <Form.Input
                    type="text"
                    onChange={event => (this.issue.title = event.target.value)}
                    required
                    placeholder="Skriv en passende tittel"/>
                <Form.InputLarge
                    type="text"
                    onChange={event => (this.issue.content = event.target.value)}
                    required
                    placeholder="Skriv innholdet i saken"/>
                <Form.FileInput>Legg til bilde</Form.FileInput>
            </Card>
        )
    }
}



const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/registerUser" component={RegisterUser} />
        <Route exact path="/registerIssue" component={RegisterIssue} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sendEmail" />
      </div>
    </HashRouter>,
    root
  );

