// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import Menu from './components/menu/Menu';
import { FileIssuePage } from './components/pages/FileIssuePage';
import { LoginPage } from './components/pages/LoginPage';
import { UserProfilePage } from './components/pages/ProfilePage/UserProfilePage';
import { AdminProfilePage } from './components/pages/ProfilePage/AdminProfilePage';
import { RegisterPage } from './components/pages/RegisterPage';
import { EventPage, EventInfo } from './components/pages/EventPage';
import { ChooseMunicipalPage } from './components/pages/ChooseMunicipalPage';
import { RegisterEventPage } from './components/pages/RegisterEventPage';
import { IssuePage } from './components/pages/IssuePage';
import { IssueLarge, IssueOverviewNormal, IssueNormal, IssueOverviewSmall } from './components/issueViews/issueViews';
import { ForgotPassword } from './components/pages/ForgotPassword.js';
import { NewPasswordPage } from './components/pages/NewPasswordPage.js';
import { UploadImageTest } from './components/image/UploadImageTest.js';
import  {AlternativeUpload } from './components/image/AlternativeUpload.js';

import { MunicipalPage } from './components/pages/MunicipalPage';
import { Issue } from './models.js';

// Reload application when not in production environment

if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after
// successfully saving a student

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/municipal/:munId" component={MunicipalPage} />
        <Route exact path="/municipal/:munId/login" component={LoginPage} />
        <Route exact path="/municipal/:munId/register" component={RegisterPage} />
        <Route exact path="/municipal/:munId/profile" component={UserProfilePage} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/reset/:userId" component={NewPasswordPage} />
        <Route exact path="/municipal/:munId/events" component={EventPage} />
          <Route exact path="/municipal/:munId/events/:eventId" component={EventInfo} />
        <Route exact path="/municipal/:munId/registerEvent" component={RegisterEventPage} />
        <Route exact path="/municipal/:munId/issues" component={IssuePage} />
        <Route exact path="/municipal/:munId/fileIssue" component={FileIssuePage} />
        <Route exact path="/municipal/:munId/issues/:issueId" component={IssueLarge} />
        <Route exact path="/image" component={AlternativeUpload} />
      </div>
    </HashRouter>,
    root
  );
