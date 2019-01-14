import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Event, EventCategory } from "../../models.js"
import {eventCategoryService, eventService} from '../../services';
import { Alert, NavBar, Form, Card, Button } from '../../widgets';
import {history} from '../../index';
import { myFunction } from '../../../public/AddEventCategory';



export default class EventForm extends Component {
  event = new Event();
  form = null;
  categories = [];
  category = new EventCategory();

  render() {
    return(
      <Card title="Registrer event/hendelse">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            onChange={e => (this.event.title = e.target.value)}
            required
            placeholder="Tittel"/>
          <div className="form-group row justify-content-center">
            <div className="col-sm-10 col-lg-4 justify-content-center">
            <select required className="form-control" value={this.event.category_id || ''}
                    onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {if(this.event) this.event.category_id = parseInt(e.target.value)}}>
              <option selected disabled value=''>Velg kategori..</option>
              <option value={1}>Dab </option>
              {this.categories.map(cat => <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>)}
              <option value={100}>Annet</option>
            </select>
            </div>
          </div>
          <Form.InputLarge
            type="text"
            onChange={e => (this.event.content = e.target.value)}
            required
            placeholder="Innhold/forklarende tekst"/>
          <Form.Input
            //label="Start"
            type="datetime-local"
            onChange={e => (this.event.timeStart = e.target.value)}
            required
            placeholder="Fra dato & tidspunkt"/>
          <Form.Input
            //label="Slutt"
            type="datetime-local"
            onChange={e => this.event.timeEnd = e.target.value} //TODO
            required
            placeholder="Til date & tidspunkt"/>
          <Form.Input
            //label="Sted"
            type="text"
            required
            placeholder="Adresse"/>
          <Form.FileInput>Legg til bilde (valgfritt) </Form.FileInput>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <Button.Basic type="submit" onClick={this.save}>Registrer event</Button.Basic>
          </div>
        </div>
        </form>
      </Card>
    );
  }
  save(){
    if (!this.form.checkValidity()){
      console.log("TRYKKET PÅ")
      return;
    }

    this.event.image = 'imagefile.img';
    this.event.longitude = 1234;
    this.event.latitude = 5678;
    //let now = new Date();
    //this.event.timeStart = now;
    //now.setHours(now.getHours() + 4);
    //this.event.timeEnd = now.setHours(now);

    eventService
      .addEvent(this.event)
      .then(history.push('/'))
      .catch((error: Error) => Alert.danger(error.message));

  }

  mounted(){
    eventCategoryService
      .getCategories()
      .then(e => this.categories = e)
      .then(e => console.log(this.categories.map(es => es.category_id)))
      .catch((error: Error) => Alert.danger(error.message));
  }

  newEvent(){
    let category = new EventCategory();
    let name = myFunction();
    console.log(name);
    if(name === ""){
      console.log("INGEN INPUT");
      return null;
    }

    category.name = name;


    eventCategoryService
      .addCategory(category)
      .then()
      .catch((error: Error) => Alert.danger(error.message));
  }
}