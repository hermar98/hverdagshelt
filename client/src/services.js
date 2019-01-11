// @flow
import axios from 'axios';
import { User, Issue, IssueCategory, Event, Municipal} from "./models.js";
import {EventCategory} from "./models";

axios.interceptors.response.use(response => response.data);

class UserService {
  getUsers(): Promise<User[]> {
    return axios.get('/users');
  }

  getUser(userId: number): Promise<User> {
    return axios.get('/users/' + userId);
  }

  updateUser(user: User): Promise<void> {
    return axios.put('/users/' + user.userId, user);
  }

  addUser(user: User): Promise<number> {
    return axios.post('/users', user);
  }

  deleteUser(userId: number): Promise<void> {
    return axios.delete('/users/' + userId);
  }
}

export let userService = new UserService();

class IssueService {
  getIssues(): Promise<Issue[]> {
    return axios.get('/issues');
  }

  getIssue(issueId: number): Promise<Issue> {
    return axios.get('/issues/' + issueId);
  }

  updateIssue(issue: Issue): Promise<void> {
    return axios.put('/issues/' + issue.issueId, issue);
  }

  addIssue(issue: Issue): Promise<number> {
    return axios.post('/issues', issue);
  }

  deleteIssue(issueId: number): Promise<void> {
    return axios.delete('/issues/' + issueId);
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
    return axios.get('/events');
  }
  getEvent(eventId: number): Promise<Event> {
    return axios.get('/events/' + eventId);
  }
  updateEvent(event: Event): Promise<void> {
    return axios.put('/events/' + event.eventId, event);
  }
  addEvent(event: Event): Promise<number> {
    return axios.post('/events', event);
  }
  deleteEvent(eventId: number): Promise<void> {
    return axios.delete('/events/' + eventId);
  }
}
export let eventService = new EventService();

class MunicipalService {
  getMunicipals(): Promise<Municipal[]> {
    return axios.get('/municipals');
  }

  getMunicipal(mun_id: number): Promise<Municipal> {
    return axios.get('/municipals/' + mun_id);
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
