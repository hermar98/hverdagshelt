// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  rank: number;
  hash: string;
  salt: string;
}

class UserService {
  static getUsers(): Promise<User[]> {
    return axios.get('/users');
  }

  static getUser(userId: number): Promise<User> {
    return axios.get('/users/' + userId);
  }

  static updateUser(user: User): Promise<void> {
    return axios.put('/users', user);
  }

  static addUser(user: User): Promise<number>{
    return axios.post('/users', user);
  }

  static deleteUser(userId: number): Promise<void> {
    return axios.delete('/users/' + userId);
  }
}

export let userService = new UserService();

export class Issue{
  issueId: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  date: Date; //Works with string, unsure about date convertion
}

class IssueService{
  static getIssues(): Promise<Issue[]>{
    return axios.get('/issues');
  }

  static getIssue(issueId: number): Promise<Issue> {
    return axios.get('/issues/' + issueId);
  }

  static updateIssue(issue: Issue): Promise<void>{
    return axios.put('/issues/', issue);
  }

  static addIssue(issue: Issue): Promise<number>{
    return axios.post('/issues', issue);
  }

  static deleteIssue(issueId: number): Promise<void>{
    return axios.delete('/issues/' + issueId);
  }
}

export let issueService = new IssueService();

export class IssueCategory{
  categoryId: number;
  name: string;
}

class IssueCategoryService{
  static getCategories(): Promise<IssueCategory[]>{
    return axios.get('/issuecategories');
  }

  static getCategory(categoryId: number): Promise<IssueCategory> {
    return axios.get('/issuecategories/' + categoryId);
  }

  static updateCategory(category: IssueCategory): Promise<void>{
    return axios.put('/issuecategories/', category);
  }

  static addCategory(category: IssueCategory): Promise<number>{
    return axios.post('/issuecategories', category);
  }

  static deleteCategory(categoryId: number): Promise<void>{
    return axios.delete('/issuecategories/' + categoryId);
  }
}

export let issueCategoryService = new IssueCategoryService();

class Event {
  event_id: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  time_start: string;
  time_end: string;
}

class EventService{
  static getEvents(): Promise<Event[]> {
    return axios.get('/events');
  }
  static getEvent(eventId: number): Promise<Event> {
    return axios.get('/events/'+eventId);
  }
  static updateEvent(event: Event): Promise<void> {
    return axios.put('/events', Event);
  }
  static addEvent(event: Event): Promise<number>{
    return axios.post('/events', event);
  }
  static deleteEvent(eventId: number): Promise<void>{
    return axios.delete('/events/' + eventId);
  }
}
export let studentService = new StudentService();
