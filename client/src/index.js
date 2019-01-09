// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {IssueLarge, IssueSmall} from './widgetsCase';
import {Issue} from "./models";


/*
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
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} exact to="/">
                React example
              </NavLink>
            </td>
            <td>
              <NavLink activeStyle={{ color: 'darkblue' }} to="/students">
                Students
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class Home extends Component {
  render() {
    return <div>React example with component state</div>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <ul>
        {this.students.map(student => (
          <li key={student.email}>
            <NavLink activeStyle={{ color: 'darkblue' }} exact to={'/students/' + student.id}>
              {student.firstName} {student.lastName}
            </NavLink>{' '}
            <NavLink activeStyle={{ color: 'darkblue' }} to={'/students/' + student.id + '/edit'}>
              edit
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }

  mounted() {
    studentService
      .getStudents()
      .then(students => (this.students = students))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentDetails extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <ul>
          <li>First name: {this.student.firstName}</li>
          <li>Last name: {this.student.lastName}</li>
          <li>Email: {this.student.email}</li>
        </ul>
      </div>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }
}

class StudentEdit extends Component<{ match: { params: { id: number } } }> {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <form>
        <ul>
          <li>
            First name:{' '}
            <input
              type="text"
              value={this.student.firstName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.firstName = event.target.value;
              }}
            />
          </li>
          <li>
            Last name:{' '}
            <input
              type="text"
              value={this.student.lastName}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.lastName = event.target.value;
              }}
            />
          </li>
          <li>
            Email:{' '}
            <input
              type="text"
              value={this.student.email}
              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                if (this.student) this.student.email = event.target.value;
              }}
            />
          </li>
        </ul>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    studentService
      .getStudent(this.props.match.params.id)
      .then(student => (this.student = student))
      .catch((error: Error) => Alert.danger(error.message));
  }

  save() {
    if (!this.student) return null;

    studentService
      .updateStudent(this.student)
      .then(() => {
        let studentList = StudentList.instance();
        if (studentList) studentList.mounted(); // Update Studentlist-component
        if (this.student) history.push('/students/' + this.student.id);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
*/

var issueTest = new Issue("Hull i veien ved Gate 7", "Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, Hull i veien, hull i veien, hull i veien, hull i veien, hull i veien, hull i veien", "https://4svs02umxmk119m8u2jfuxf1-wpengine.netdna-ssl.com/wp-content/uploads/2015/03/shutterstock_55640203-900x450.jpg", 3, "04-02-2018");
var issuesTest = [
    new Issue("Hull i veien ved Gate 7" ,"", "", 1,""),
    new Issue("Ødelagt bom ved broa" ,"", "", 3,""),
    new Issue("Herverk på husveggen min" ,"", "", 2,""),
    new Issue("Søppeltømmingsplanene fungerer ikke bra" ,"", "", 2,""),
    new Issue("Hull i veien ved Gate 7" ,"", "", 3,""),
    new Issue("Ødelagt bom ved broa" ,"", "", 3,""),
    new Issue("Herverk på husveggen min" ,"", "", 2,""),
    new Issue("Søppeltømmingsplanene fungerer ikke bra" ,"", "", 1,"")
    ]

class IssuePage extends Component {
    render () {
        return <div className="issue-container">
            <IssueLarge issue={issueTest}/>
        </div>
    }
}

class IssueOverview extends Component {
    render () {
        return (
            <div className="issue-container">
            <ul className="list-group">
                {issuesTest.map(issue =>
                    <li className="list-group-item">
                        <IssueSmall issue={issue}/>
                    </li>
                )}
            </ul>
            </div>
        )
    }
}


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={IssuePage} />
        <Route exact path="/" component={IssueOverview} />
      </div>
    </HashRouter>,
    root
  );
