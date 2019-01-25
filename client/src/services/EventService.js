//@flow
import {Event} from "../models/Event";
import service from "./Service";
import {tokenManager} from "../tokenManager";

class EventService {
  getEvents(): Promise<Event[]> {
    return service.get('/events');
  }

  getEvent(eventId: number): Promise<Event> {
    return service.get('/events/' + eventId);
  }

  getEventsByMunicipal(munId: number): Promise<Event[]> {
    return service.get('/municipals/' + munId + '/events');
  }

  updateEvent(event: Event): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.put('/events/' + event.eventId, event, {
      headers: {
        'x-access-token': token
      }
    });
  }

  addEvent(event: Event): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/events', event, {
      headers: {
        'x-access-token': token
      }
    });
  }

  deleteEvent(eventId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

      return service.delete('/events/' + eventId, {
        headers: {
          'x-access-token': token
        }
      });
  }
}

export let eventService = new EventService();