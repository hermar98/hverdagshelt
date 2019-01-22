//@flow
import {Event} from "../models/Event";
import service from "./Service";

class EventService {
  getEvents(): Promise<Event[]> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return service.get('/secure/events', {
      headers: {
        'x-access-token': token
      }
    });
  }

  getEvent(eventId: number): Promise<Event> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return service.get('/secure/events/' + eventId, {
      headers: {
        'x-access-token': token
      }
    });
  }

  getEventsByMunicipal(munId: number): Promise<Event[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/municipals/' + munId + '/events', {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateEvent(event: Event): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return service.put('/secure/events/' + event.eventId, event, {
      headers: {
        'x-access-token': token
      }
    });
  }

  addEvent(event: Event): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return service.post('/secure/events', event, {
      headers: {
        'x-access-token': token
      }
    });
  }

  deleteEvent(eventId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return service.delete('/secure/events/' + eventId, {
      headers: {
        'x-access-token': token
      }
    });
  }
}

export let eventService = new EventService();