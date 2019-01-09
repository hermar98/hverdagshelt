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
  date: string; //Look at this later? Maybe another datatype? This works though.
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
  name: number;
}

class IssueCategoryService{
  getCategories(): Promise<Category[]> {
    return axios.get('/categories');
  }
  getCategory(category_id: number): Promise<Category> {
    return axios.get('/categories/'+category_id);
  }
  updateCategory(category: Category): Promise<void> {
    return axios.put('/categories', Category);
  }
}

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
  getEvents(): Promise<Event[]> {
    return axios.get('/events');
  }
  getEvent(event_id: number): Promise<Event> {
    return axios.get('/events/'+event_id);
  }
  updateEvent(event: Event): Promise<void> {
    return axios.put('/events', Event);
  }
}
export let studentService = new StudentService();
