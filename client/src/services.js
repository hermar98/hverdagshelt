// @flow
import axios from 'axios';
import { User, Issue, IssueCategory, Event, Municipal} from "./models.js";
import {EventCategory} from "./models";

axios.interceptors.response.use(response => response.data);

class UserService {
  getUsers(): Promise<User[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/users', {
      headers: {'x-access-token': token}
    });
  }

  getUser(userId: number): Promise<User> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  updateUser(user: User): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.put('/users/' + user.userId, user, {
        headers: {'x-access-token': token}
    });
  }

  addUser(user: User): Promise<number> {
    return axios.post('/register', user);
  }

  deleteUser(userId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.delete('/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  login(email: string, password: string): Promise<JSON> {
    return axios.post('/login', {email: email, password: password});
  }

  getToken(): Promise<JSON> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/token', {
      headers: {'x-access-token': token}
    });
  }
}

export let userService = new UserService();

class IssueService {
  getIssues(): Promise<Issue[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/issues', {
      headers: {'x-access-token': token}
    });
  }

  getIssue(issueId: number): Promise<Issue> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/issues/' + issueId, {
      headers: {'x-access-token': token}
    });
  }

  updateIssue(issue: Issue): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.put('/issues/' + issue.issueId, issue, {
      headers: {'x-access-token': token}
    });
  }

  addIssue(issue: Issue): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.post('/issues', issue, {
        headers: {'x-access-token': token}
    });
  }

  deleteIssue(issueId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.delete('/issues/' + issueId, {
      headers: {'x-access-token': token}
    });
  }
}

export let issueService = new IssueService();

class IssueCategoryService {
  getCategories(): Promise<IssueCategory[]> {
    return axios.get('/issueCat');
  }

  getCategory(categoryId: number): Promise<IssueCategory> {
    return axios.get('/issueCat/' + categoryId);
  }

  updateCategory(category: IssueCategory): Promise<void> {
    return axios.put('/issueCat/' + category.categoryId, category);
  }

  addCategory(category: IssueCategory): Promise<number> {
    return axios.post('/issueCat', category);
  }

  deleteCategory(categoryId: number): Promise<void> {
    return axios.delete('/issueCat/' + categoryId);
  }
}

export let issueCategoryService = new IssueCategoryService();

class EventService {

  getEvents(): Promise<Event[]> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt
    }
    return axios.get('/secure/events', {
      headers: {
        'x-access-token': token
      }
    });
  }

  getEvent(eventId: number): Promise<Event> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt
    }
    return axios.get('/events/' + eventId, {
      headers: {
        'x-access-token': token
      }
    });
  }

  updateEvent(event: Event): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) {
        token = JSON.parse(token).jwt
    }
    return axios.put('/events/' + event.eventId, event, {
      headers: {
        'x-access-token': token
      }
    });
  }
  addEvent(event: Event): Promise<number> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt
    }
    return axios.post('/events', event, {
      headers: {
        'x-access-token': token
      }
    });
  }
  deleteEvent(eventId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt
    }
    return axios.delete('/events/' + eventId, {
      headers: {
        'x-access-token': token
      }
    });
  }
}
export let eventService = new EventService();

class MunicipalService{

    getMunicipals(): Promise<Municipal[]>{
        return axios.get('/municipal');
    }

    getMunicipal(mun_id: number): Promise<Municipal> {
        return axios.get('/municipal/' + mun_id);
    }
}

export let municipalService = new MunicipalService();

class EventCategoryService {
  getCategories(): Promise<EventCategory[]> {
    return axios.get('/eventCat');
  }

  getCategory(categoryId: number): Promise<EventCategory> {
    return axios.get('/eventCat/' + categoryId);
  }

  updateCategory(category: EventCategory): Promise<void> {
    return axios.put('/eventCat/' + category.categoryId, category);
  }

  addCategory(category: EventCategory): Promise<number> {
    return axios.post('/eventCat', category);
  }

  deleteCategory(categoryId: number): Promise<void> {
    return axios.delete('/eventCat/' + categoryId);
  }
}

export let eventCategoryService = new EventCategoryService();