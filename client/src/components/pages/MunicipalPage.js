// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { autocomplete, glob } from '../../../public/autocomplete';
import {eventService, issueService} from '../../services';
import { Alert, Card } from '../../widgets';
import { history } from '../../index';
import {IssueOverviewSmall, IssueSmall} from '../issueViews/issueViews';
import { DisplayEvent2 } from "./EventPage";
import Menu from "../menu/Menu";

export class MunicipalPage extends Component <{match: {params: {munId: number}}}>{
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
                        <ul className="container-fluid">
                            {this.events.map(event =>
                                <li key={event.eventId}>
                                    <DisplayEvent2 event={event}/>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        issueService
            // .getIssuesByMunicipal(this.props.match.params.munId)
            .getIssues()
            .then(issues => {(this.issues = issues);})
            .catch((error: Error) => Alert.danger(error.message));

        eventService
            // .getEventsByMunicipal(this.props.match.params.munId)
            .getEvents()
            .then(events => (this.events = events))
            .catch((error: Error) => Alert.danger(error.message));
    }
}
