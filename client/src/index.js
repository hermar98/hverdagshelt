// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, NavBar, Form, Card, Button } from './widgets';
import Menu from './components/menu/Menu';
import { Footer } from './components/menu/Footer';
import { FileIssuePage } from './components/pages/FileIssuePage';
import { LoginPage } from './components/pages/LoginPage';
import { UserProfilePage } from './components/pages/ProfilePage/UserProfilePage';
import { AdminProfilePage } from './components/pages/ProfilePage/AdminProfilePage';
import { RegisterPage } from './components/pages/RegisterPage';
import { EventPage, EventInfo } from './components/pages/EventPage';
import { FeedPage } from './components/pages/FeedPage';
import { ChooseMunicipalPage } from './components/pages/ChooseMunicipalPage';
import { RegisterEventPage } from './components/pages/RegisterEventPage';
import { IssuePage } from './components/pages/IssuePage';
import { IssueLarge, IssueOverviewNormal, IssueNormal, IssueOverviewSmall } from './components/issueViews/issueViews';
import { ForgotPassword } from './components/pages/ForgotPassword.js';
import { NewPasswordPage } from './components/pages/NewPasswordPage.js';
import { TermsOfService } from './components/pages/TermsOfServicePage.js';
import { AdminPage } from './components/pages/AdminPage.js';
import { UploadImageTest } from './components/image/UploadImageTest.js';
import { AlternativeUpload } from './components/image/AlternativeUpload.js';

import { MunicipalPage } from './components/pages/MunicipalPage';
import { Issue } from './models/Issue.js';

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
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/glemtPassord" component={ForgotPassword} />
        <Route exact path="/glemtPassord/reset" component={NewPasswordPage} />
        <Route exact path="/vilkår" component={TermsOfService} />
        <Route exact path="/profil" component={UserProfilePage} />
        <Route exact path="/saker/:issueId" component={IssueLarge} />
        <Route exact path="/registrerSak" component={FileIssuePage} />
        <Route exact path="/feed" component={FeedPage} />
        <Route exact path="/kommune/:munId" component={MunicipalPage} />
        <Route exact path="/admin" component={AdminPage}/>
        <Footer />
      </div>
    </HashRouter>,
    root
  );
/*
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/glemtPassord" component={ForgotPassword} />
        <Route exact path="/glemtPassord/reset" component={NewPasswordPage} />
        <Route exact path="/vilkår" component={TermsOfService} />
        <Route exact path="/profil" component={UserProfilePage} />
        <Route exact path="/feed" component={} />
        <Route exact path="/registrerSak" component={FileIssuePage} />
        <Route exact path="/bedrift" component={} />
        <Route exact path="/admin" component={} />
        <Route exact path="/statistikk" component={} />

        <Route exact path="/kommune/:munId" component={MunicipalPage} />
        <Route exact path="/kommune/:munId/sak" component={IssuePage} />
        <Route exact path="/kommune/:munId/sak/:issueId" component={IssueLarge} />
        <Route exact path="/kommune/:munId/hendelse" component={EventPage} />
        <Route exact path="/kommune/:munId/hendelse/:eventId" component={EventInfo} />
        <Route exact path="/kommune/:munId/ansatt" component={} />
 */
