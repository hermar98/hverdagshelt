// @flow

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { eventService } from '../../services/EventService';
import { issueService } from '../../services/IssueService';
import { userMunicipalService } from '../../services/UserMunicipalService';
import { issueCategoryService } from '../../services/IssueCategoryService';
import { eventCategoryService } from '../../services/EventCategoryService';
import { Alert, Card } from '../../widgets';
import {IssueOverviewSmall, IssueSmall} from '../issueViews/issueViews';
import {DisplayEvent2, EventLarge, EventSmall} from "./EventPage";
import Menu from "../menu/Menu";
import NavLink from "react-router-dom/es/NavLink";
import { userService } from '../../services/UserService';
import { tokenManager } from '../../tokenManager';
import { User } from '../../models/User';

let sharedMunicipals = sharedComponentData({municipals: []});
let sharedIssues = sharedComponentData({issues: []});
let sharedEvents = sharedComponentData({events: []});

export class FeedPage extends Component {
  // date for events
  user = new User();
  iCategories = [];
  eCategories = [];


  munId: number = 0;
  iCategoryId: number = 0;
  eCategoryId: number = 0;
  timesort: string = "Nyeste";
  status: number = 0;

  render() {
    return(
      <div>
        <Menu />
        <div className="row">
          <div className="col-lg-6">
            <Card title="Feil/mangler">
              <div className="issue-overview-small">
                <div className="d-flex flex-row sort-box card-header justify-content-between">
                  <div className="form-group mt-2 ml-1">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.munId = event.target.value)}>
                      <option value={0}>Alle kommuner</option>
                      {sharedMunicipals.municipals.map(mun =>
                        <option key={mun.munId} value={mun.munId}>{mun.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group mt-2">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.iCategoryId = event.target.value)}>
                      <option value={0}>Alle kategorier</option>
                      {this.iCategories.map(cat =>
                        <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group mt-2 mr-1">
                    <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                      <option>Nyeste</option>
                      <option>Eldste</option>
                    </select>
                  </div>
                </div>
              </div>
              <ul className="container-fluid">
                {sharedIssues.issues.filter(e => {
                  return e.statusId !== 1 && (e.categoryId == this.iCategoryId || this.iCategoryId == 0)
                    && (e.munId == this.munId || this.munId == 0) })
                  .map(e =>
                    <li key={e.issueId}>
                      <Card>
                        <IssueSmall issue={e} munId={e.munId}/>
                      </Card>
                    </li>
                  )}
              </ul>
            </Card>
          </div>
          <div className="col-lg-6">
            <Card title="Events" id="event-cards">
              <div className="d-flex flex-row sort-box card-header justify-content-between">
                <div className="form-group mt-2 ml-1">
                  <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.eCategoryId = event.target.value)}>
                    <option value={0}>Alle kategorier</option>
                    {this.eCategories.map(e =>
                      <option key={e.categoryId} value={e.categoryId}>{e.name}</option>)}
                  </select>
                </div>
                <div className="form-group mt-2 mr-1">
                  <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                    <option>Nyeste</option>
                    <option>Eldste</option>
                  </select>
                </div>
              </div>
              <ul className="container-fluid">
                {sharedEvents.events.filter(e =>{
                  return e.categoryId == this.eCategoryId || this.eCategoryId == 0})
                  .map(e =>
                  <li key={e.eventId}>
                    <EventSmall event={e}/>
                  </li>)}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    userService
      .getToken()
      .then(() => {
        userService
          .getUser(tokenManager.getUserId())
          .then(user => {
            this.user = user;
          })
          .catch((error: Error) => console.log(error));
      })
      .catch((error: Error) => console.log(error));

    //GET all municipals a user has subscribed to
    userMunicipalService
      .getUserMunicipals(tokenManager.getUserId())
      .then(muns => {
        sharedMunicipals.municipals = muns;
        sharedMunicipals.municipals.map(e => issueService.getIssuesByMunicipal(e.munId)

        //GET all Issues registered on the municipals
          .then(issues => {
            Array.prototype.push.apply(sharedIssues.issues, issues)
          })
          .catch((error: Error) => Alert.danger(error.message)));

        //GET all events registered on the municipals
        sharedMunicipals.municipals.map(e => eventService.getEventsByMunicipal(e.munId)
          .then(events => {
            Array.prototype.push.apply(sharedEvents.events, events)
          })
          .catch((error: Error) => Alert.danger(error.message)));
      })
      .then(()=> console.log(sharedMunicipals.municipals))
      .catch((error: Error) => Alert.danger(error.message));

    //GET all issueCategories
    issueCategoryService
      .getCategories()
      .then(cat => (this.iCategories = cat))
      .catch((error: Error) => Alert.danger(error.message));

    eventCategoryService
      .getCategories()
      .then(cat => (this.eCategories = cat))
      .catch((error: Error) => Alert.danger(error.message));
  }
}


