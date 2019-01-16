// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import { eventService, issueService } from '../../services';
import { Alert, Card } from '../../widgets';
import { history } from '../../index';
import {IssueOverviewSmall, IssueSmall} from '../issueViews/issueViews';
import {DisplayEvent2, EventLarge, EventSmall} from "./EventPage";
import Menu from "../menu/Menu";
import NavLink from "react-router-dom/es/NavLink";

export class MunicipalPage extends Component <{match: {params: {munId: number}}}>{ //TODO: FIX select by category and date for events
    issues = [];
    events = [];
    render() {
        return(
            <div>
                <Menu />
                <div className="row">
                    <div className="col-lg-6">
                        <Card title="Feil/mangler">
                            <ul className="container-fluid">
                                <IssueOverviewSmall munId={this.props.match.params.munId}/>
                            </ul>
                        </Card>
                    </div>
                    <div className="col-lg-6">
                      <Card title="Events" id="event-cards">
                        <div className="d-flex flex-row sort-box card-header justify-content-between">
                          <div className="form-group">
                            <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.status = event.target.value)}>
                              <option value={0}>Alle kategorier</option>
                              <option value={2}>Party</option>
                              <option value={3}>Konsert</option>
                              <option value={4}>Galleri</option>
                              <option value={1}>Annet</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <select className="form-control" id="statusSelect" onChange={(event): SyntheticInputEvent<HTMLInputElement> => (this.timesort = event.target.value)}>
                              <option>Nyeste</option>
                              <option>Eldste</option>
                            </select>
                          </div>
                        </div>
                        <ul className="container-fluid">
                          {this.events.map(e =>
                            <li key={e.eventId}>
                                    <EventSmall event={e}/>
                                </li>)}
                        </ul>
                      </Card>
                    </div>
                </div>
              <img className="w-100 h-50" src="../../images/trondheim.jpg"/>
            </div>
        );
    }

  mounted() {
    issueService
      .getIssuesByMunicipal(this.props.match.params.munId)
      .then(issues => {
        this.issues = issues;
      })
      .catch((error: Error) => Alert.danger(error.message));

    eventService
      .getEventsByMunicipal(this.props.match.params.munId)
      .then(events => (this.events = events))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
