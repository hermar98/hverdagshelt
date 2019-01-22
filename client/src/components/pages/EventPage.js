import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { EventCategory } from '../../models/EventCategory.js';
import {eventCategoryService} from '../../services/EventCategoryService';
import {Alert, DisplayEvent} from '../../widgets';
import {Issue} from "../../models/Issue";
import {Status} from "../issueViews/issueViews";
import moment from "moment";
import NewMenu from "../menu/Menu";
import {eventService} from "../../services/EventService";
import {Event} from "../../models/Event";


export class EventPage extends Component {
  events = [];

  render() {
    return (
      <div>
      <NewMenu/>
      <div className="container col-10 mt-4 h-100">
        <div className="row h-100">
        {this.events.map(e =>
        <EventLarge event={e}/>)}
        </div>
      </div>
      </div>
    );
  }

  mounted(){
    eventService
      .getEvents()
      .then(e => this.events = e)
      .catch((error: Error) => Alert.danger(error.message));
  }
}


export class DisplayEvent2 extends Component<{event: Event}>{
  render () {
    return (
      <div className="issue-normal" event={this.props.event}>
        <div className="d-flex flex-row issue-flex">
          <div className="p-2">
            <img className="card-img issue-image" src={this.props.event.image}/>
          </div>
          <div className="p-2"><h1>{this.props.event.title}</h1></div>
        </div>
      </div>
    )
  }

  mounted(){

  }
}

export class EventPage2 extends Component<{issues: Issue[]}> {
  render () {
    return (
      <div className="issue-overview-normal">
        <ul className="list-group">
          {this.props.issues.map(e =>
            <li className="list-group-item">
              <DisplayEvent2 event={e}/>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export class EventLarge extends Component<{ event: Event }> {
  render() {
    return (
        <div className="card" id="card-event">
          <div className="card-body">
            <div className="card-title-event">
              <h2>{this.props.event.title}</h2>
            </div>
            <div className="card-text">
              <p>{this.props.event.content}</p>
            </div>
          </div>
            <img className="event-image" src="https://www.naf.no/globalassets/tips-rad/vei-trafikk/hull_i_veien_bil2.jpg?width=980&height=550&mode=max&anchor=middlecenter&scale=both&quality=85"/>
          <div className="card-footer">
            <small className="text-muted-left">{"Fra: " + moment(this.props.event.timeStart).format("DD.MM HH:mm")}</small>
            <small className="text-muted-right">{"Til: " + moment(this.props.event.timeEnd).format("DD.MM HH:mm")}</small>
          </div>
        </div>
    )
  }
}

export class EventSmall extends Component<{ event: Event }> {

  textLength = 50;

  render() {
    return (
      <div className="card mb-2">
        <a id="a-hover" href={"#/kommune/" + this.props.event.munId + "/events/" + this.props.event.eventId}>
          <img src="../../images/arrowRightTrans.png" />
        </a>
        <div className="card-body">
          <div className="row">
            <h5 className="card-title">{this.props.event.title}</h5>
            <img id="event-image-small" src={this.props.event.image} alt={"Bildetekst"}/>
          </div>
        </div>
        <div>
          {(this.props.event.content <= this.textLength ? (this.props.event.content):
            (this.props.event.content.substring(0, this.textLength) + "..."))}
        </div>
        <div className="card-footer">
          <small className="text-muted-left">{"Starter: " + moment(this.props.event.timeStart).format("DD.MM HH:mm")}</small>
          <small className="text-muted-right">{"Slutter: " + moment(this.props.event.timeEnd).format("DD.MM HH:mm")}</small>
        </div>
      </div>
    )
  }

  mounted(){

  }
}


export class EventInfo extends Component<{match: {params: {eventId: number}}}> {
    event = null;
    eventCategory = null;

    render() {
        if (!this.event) return null;
        if (!this.eventCategory) return null;

        return (
            <div>
                <NewMenu/>
                <div className="container my-4">
                    <div className="card">
                        <img className="card-img-top" src={this.event.image}/>
                        <div className="card-body">
                            <h2 className="card-title">{this.event.title}</h2>
                            <p className="card-text">
                                <small>
                                    <b>Kategori: </b>
                                    {this.eventCategory.name}
                                    <br/><b>Fra: </b>
                                    {moment(this.event.timeStart).format('DD.MM.YYYY HH:mm')}
                                    <br/><b>Til: </b>
                                    {moment(this.event.timeEnd).format('DD.MM.YYYY HH:mm')}
                                    <br/><b>Sted (koordinater): </b>
                                    {this.event.latitude + ', ' + this.event.longitude}
                                </small>
                            </p>
                            <p className="card-text">{this.event.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        eventService.getEvent(this.props.match.params.eventId)
            .then(event => {
                this.event = event;
                eventCategoryService.getCategory(event.categoryId)
                    .then(eventCategory => this.eventCategory = eventCategory)
                    .catch((error: Error) => Alert.danger(error.message))
            }).catch((error: Error) => Alert.danger(error.message));
    }
}