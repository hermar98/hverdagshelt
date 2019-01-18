import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Event, EventCategory } from '../../models.js';
import { eventCategoryService} from '../../services/EventCategoryService';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import { history } from '../../index';
import { myFunction } from '../../../public/AddEventCategory';
import { tokenManager } from '../../tokenManager';
import {eventService} from "../../services/EventService";
//import { UploadImageButton } from '../../components/image/UploadImageButton';

export default class EventForm extends Component {
  event = new Event();
  form = null;
  categories = [];
  filteredCategories = [];
  category = new EventCategory();
  munId = localStorage.getItem('munId');
  userId = tokenManager.getUserId();

  render() {
    return (
      <Card title="Registrer event/hendelse">
        <form ref={e => (this.form = e)}>
          <Form.Input type="text" onChange={e => (this.event.title = e.target.value)} required placeholder="Tittel" />
          <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
              <select
                required
                className="form-control"
                value={this.event.categoryId}
                onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
                  if (this.event) this.event.categoryId = parseInt(e.target.value);
                }}
              >
                <option selected disabled value="">
                  Velg kategori..
                </option>
                {this.categories.map(cat => (
                  <option key={cat.category_id} value={cat.categoryId}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Form.InputLarge
            type="text"
            onChange={e => (this.event.content = e.target.value)}
            required
            placeholder="Innhold/forklarende tekst"
          />
          <Form.Input
            //label="Start"
            type="datetime-local"
            onChange={e => (this.event.timeStart = e.target.value)}
            required
            placeholder="Fra dato & tidspunkt"
          />
          <Form.Input
            //label="Slutt"
            type="datetime-local"
            onChange={e => (this.event.timeEnd = e.target.value)} //TODO
            required
            placeholder="Til date & tidspunkt"
          />
          <Form.Input
            //label="Sted"
            type="text"
            required
            placeholder="Adresse"
          />
          <Form.FileInput>Legg til bilde (valgfritt) </Form.FileInput>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <Button.Basic type="submit" onClick={this.save}>
                Registrer event
              </Button.Basic>
            </div>
          </div>
        </form>
      </Card>
    );
  }
  save() {
    if (!this.form.checkValidity()) {
      console.log('TRYKKET PÅ');
      return;
    }

    this.event.image = 'imagefile.img';
    this.event.longitude = 1234;
    this.event.latitude = 5678;
    this.event.munId = this.munId;
    this.event.userId = this.userId;

    eventService
      .addEvent(this.event)
      .then(history.push('/municipal/' + this.munId))
      .catch((error: Error) => Alert.danger(error.message));
  }

  mounted() {
    eventCategoryService
      .getCategories()
      .then(e => {
        this.categories = e;
        let first = this.categories.shift();
        this.categories.push(first);
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
