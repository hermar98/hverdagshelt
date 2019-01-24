//@flow
import {Municipal} from "../models/Municipal";
import service from './Service';
import {tokenManager} from "../tokenManager";

class UserMunicipalService {
  getUserMunicipals(userId: number): Promise<Municipal[]> {
    return service.get('/users/' + userId + '/mun');
  }

  addUserMunicipal(userId: number, munId: number): Promise<Object> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.post('/users/' + userId + '/mun/' + munId, null, {headers: {'x-access-token': token}});
  }

  deleteUserMunicipal(userId: number, munId: number): Promise<void> {
      let token = tokenManager.getJwt();
      tokenManager.getNewToken()
          .then(newToken => tokenManager.updateToken(newToken))
          .catch((error: Error) => console.log(error));

    return service.delete('/users/' + userId + '/mun/' + munId, {
      headers: {
        'x-access-token': token
      }
    });
  }

  // addUserMunicipal(userId: number, munId: number): Promise<void> {
  //   let token = localStorage.getItem('token');
  //   if (token) token = JSON.parse(token).jwt;
  //   console.log('pener');
  //   return Service({
  //     method: 'post',
  //     url: 'http://127.0.0.1:8000/api/login',
  //     data: bodyFormData,
  //     config: { headers: { 'Content-Type': 'multipart/form-data' } }
  //   })
  //     .then(function(response) {
  //       //handle success
  //       console.log(response);
  //     })
  //     .catch(function(response) {
  //       //handle error
  //       console.log(response);
  //     });
  //   return Service.post('/user/' + userId + '/mun/' + munId, {
  //     headers: { 'x-access-token': token }
  //   });
  // }
}

export let userMunicipalService = new UserMunicipalService();