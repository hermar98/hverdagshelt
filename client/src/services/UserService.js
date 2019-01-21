//@flow
import {User} from "../models";
import service from "./Service";

class UserService {
  getUsers(): Promise<User[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/users', {
      headers: {'x-access-token': token}
    });
  }

  getUser(userId: number): Promise<User> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/secure/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  updateUser(user: User): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.put('/secure/users/' + user.userId, user, {
      headers: {'x-access-token': token}
    });
  }

  addUser(user: User): Promise<number> {
    return service.post('/register', user);
  }

  deleteUser(userId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.delete('/secure/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  login(email: string, password: string): Promise<JSON> {
    return service.post('/login', {email: email, password: password});
  }

  getToken(): Promise<JSON> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return service.get('/token', {
      headers: {'x-access-token': token}
    });
  }

  forgotPassword(email: string): Promise<Object> {
    return service
      .post('/forgotPassword', {
        email: email
      })
      .catch(error => {
        console.log(error);
      });
  }

  newPassword(token: string, password: string): Promise<JSON> {
    console.log(password + 'serivee');
    return service
      .put('/reset/' + token, {
        password: password
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
}

export let userService = new UserService();