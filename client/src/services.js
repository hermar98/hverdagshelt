// @flow
import axios from 'axios';
import { User, Issue, IssueCategory, Event, Municipal} from "./models.js";

axios.interceptors.response.use(response => response.data);

class UserService {
  getUsers(): Promise<User[]> {
    return axios.get('/users');
  }

  getUser(userId: number): Promise<User> {
    return axios.get('/users/' + userId);
  }

  updateUser(user: User): Promise<void> {
    return axios.put('/users', user);
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
    return axios.put('/issues/', issue);
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
    return axios.get('/issuecategories');
  }

  getCategory(categoryId: number): Promise<IssueCategory> {
    return axios.get('/issuecategories/' + categoryId);
  }

  updateCategory(category: IssueCategory): Promise<void> {
    return axios.put('/issuecategories/', category);
  }

  addCategory(category: IssueCategory): Promise<number> {
    return axios.post('/issuecategories', category);
  }

  deleteCategory(categoryId: number): Promise<void> {
    return axios.delete('/issuecategories/' + categoryId);
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
    return axios.put('/events', event);
  }
  addEvent(event: Event): Promise<number> {
    return axios.post('/events', event);
  }
  deleteEvent(eventId: number): Promise<void> {
    return axios.delete('/events/' + eventId);
  }
}
export let eventService = new EventService();

class MunicipalService{

    getMunicipals(): Promise<Municipal[]>{
        return axios.get('/municipals');
    }

    getMunicipal(mun_id: number): Promise<Municipal> {
        return axios.get('/municipals/' + mun_id);
    }
}

export let municipalService = new MunicipalService();