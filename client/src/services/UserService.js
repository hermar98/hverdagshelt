//@flow
import {User} from "../models/User";
import service from "./Service";
import {tokenManager} from "../tokenManager";

class UserService {
  getUsers(): Promise<User[]> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.get('/users', {
      headers: {'x-access-token': token}
    });
  }

  getUser(userId: number): Promise<User> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.get('/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

    getCurrentUser(): Promise<User> {
        let token = tokenManager.getJwt();
        tokenManager.getNewToken()
            .then(newToken => tokenManager.updateToken(newToken))
            .catch((error: Error) => console.log(error));

        return service.get('/token/user', {
            headers: {'x-access-token': token}
        });
    }

  updateUser(user: User): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.put('/users/' + user.userId, user, {
      headers: {'x-access-token': token}
    });
  }

  addUser(user: User): Promise<number> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/register', user, {
        headers: {'x-access-token': token}
    });
  }

  deleteUser(userId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.delete('/users/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  login(email: string, password: string): Promise<JSON> {
    return service.post('/login', {email: email, password: password});
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
    return service
      .put('/reset/' + token, {
        password: password
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }

  activateAccount(token: string, user?: User): Promise<JSON>{
    return service.put('/activate/' + token, user);
  }

  checkActivationToken(token: string): Promise<User>{
    return service.get('/activate/' + token);
  }
}

export let userService = new UserService();