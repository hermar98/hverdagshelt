// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Alert } from './widgets';
import { Footer } from './components/menu/Footer';
import { FileIssuePage } from './components/pages/FileIssuePage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { EventInfo } from './components/pages/EventPage';
import { FeedPage } from './components/pages/FeedPage';
import { ChooseMunicipalPage } from './components/pages/ChooseMunicipalPage';
import { Menu } from './components/menu/Menu';
import { IssueLarge } from './components/issueViews/issueViews';
import { ForgotPassword } from './components/pages/ForgotPassword.js';
import { NewPasswordPage } from './components/pages/NewPasswordPage.js';
import { StatisticsPage } from './components/pages/StatisticsPage.js';
import { TermsOfService } from './components/pages/TermsOfServicePage.js';
import { AdminPage, AdminEditPage } from './components/pages/AdminPage.js';
import { AlternativeUpload } from './components/image/AlternativeUpload.js';
import { AdminHandleCategories } from './components/pages/AdminHandleCategories';
import { MunicipalPage } from './components/pages/MunicipalPage';
import { NotFound } from './components/pages/NotFound';
import { IssueView } from './components/pages/IssueOverviewPage';
import { ContractorView } from './components/pages/CompanyIssuePage';
import { ActivateAccountPage } from './components/pages/ActivateAccountPage';
import { Map } from './map';
import { RegisterEventPage } from './components/pages/RegisterEventPage';
import createHashHistory from 'history/createHashHistory';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import AdminAddPage from './components/forms/AdminAddPage';
import { CompanyDelIssuePage } from './components/pages/CompanyDelIssuePage';

// Reload application when not in production environment

if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after

const root = document.getElementById('root');

if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Route path="/" component={Menu} />
        <Switch>
          <Route exact path="/" component={ChooseMunicipalPage} />
          <Route exact path="/loggInn" component={LoginPage} />
          <Route exact path="/registrer" component={RegisterPage} />
          <Route exact path="/glemtPassord" component={ForgotPassword} />
          <Route exact path="/glemtPassord/nullstill" component={NewPasswordPage} />
          <Route exact path="/vilkår" component={TermsOfService} />
          <Route exact path="/profil" component={ProfilePage} />
          <Route exact path="/saker/:issueId" component={IssueLarge} />
          <Route exact path="/registrerSak" component={FileIssuePage} />
          <Route exact path="/registrerEvent" component={RegisterEventPage} />
          <Route exact path="/minSide" component={FeedPage} />
          <Route exact path="/kommune/:munId" component={MunicipalPage} />
          <Route exact path="/image" component={AlternativeUpload} />
          <Route exact path="/aktiver/:tokenId" component={ActivateAccountPage} />
          <Route exact path="/kommune/:munId/saker" component={IssueView} />
          <Route exact path="/saker" component={ContractorView} />
          <Route exact path="/statistikk" component={StatisticsPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/admin/edit/:userId" component={AdminEditPage} />
          <Route exact path="/admin/registrerBruker" component={AdminAddPage} />
          <Route exact path="/admin/administerKategorier" component={AdminHandleCategories} />
          <Route exact path="/hendelser/:eventId" component={EventInfo} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/delegerSaker" component={ CompanyDelIssuePage} />
          <Route path="" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </HashRouter>,
    root
  );
/*
        <Route exact path="/" component={ChooseMunicipalPage} />
        <Route exact path="/loggInn" component={LoginPage} />
        <Route exact path="/registrer" component={RegisterPage} />
        <Route exact path="/glemtPassord" component={ForgotPassword} />
        <Route exact path="/glemtPassord/nullstill" component={NewPasswordPage} />
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
