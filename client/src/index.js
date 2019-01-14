// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import { MenuLoggedIn } from './components/menu/MenuLoggedIn';
import Menu from './components/menu/Menu';
import { FileIssuePage } from './components/pages/FileIssuePage';
import { LoginPage } from './components/pages/LoginPage';
import { ProfilePage } from './components/pages/ProfilePage/ProfilePage';
import { RegisterPage } from './components/pages/RegisterPage';
import { ChooseMunicipalPage } from './components/pages/ChooseMunicipalPage';
import { RegisterEventPage } from './components/pages/RegisterEventPage';
import { EventPage } from './components/pages/EventPage';
import { IssueLarge, IssueNormal, IssueOverviewSmall } from './components/issueViews/issueViews';
import { Issue } from './models.js';
import { Map } from './map.js';

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
        <Menu />
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/issues" component={IssueOverviewSmall} />
        <Route path="/issues/:issueId" component={IssueLarge} />
        <Route exact path="/registerUser" component={RegisterPage} />
        <Route exact path="/registerIssue" component={FileIssuePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/sendEmail" />
        <Route exact path="/event/register" component={RegisterEventPage} />
        <Route exact path="/events/" component={EventPage} />
        <Route exact path="/municipal/:mun_id" component={IssueNormal} />
        <Route exact path="/map" component={Map} />
      </div>
    </HashRouter>,
    root
  );
