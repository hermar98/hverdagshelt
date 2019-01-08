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

  static getUser(userId: number): Promise<User[]> {
    return axios.get('/users/' + userId);
  }

  static updateUser(user: User, userId: number): Promise<void> {
    return axios.put('/users/' + userId, user);
  }

  static addUser(user: User): Promise<number>{
    return axios.post('/users', user);
  }

  static deleteUser(userId: number): Promise<void> {
    return axios.delete('/users/' + userId);
  }
}

export class Case{
  caseId: number;
  title: string;
  content: string;
  image: string;
  longitude: number;
  latitude: number;
  date: string; //Look at this later? Maybe another datatype? This works though.
}
