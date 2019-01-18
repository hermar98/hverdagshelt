//@flow
import {Municipal} from "../models";
import axios from "axios";

class UserMunicipalService {
  getUserMunicipals(userId: number): Promise<Municipal[]> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    return axios.get('/secure/userMun/' + userId, {
      headers: {'x-access-token': token}
    });
  }

  addUserMunicipal(userId: number, munId: number): Promise<Object> {
    let token = localStorage.getItem('token');
    if (token) token = JSON.parse(token).jwt;
    console.log(token);
    return axios.post('/secure/user/' + userId + '/mun/' + munId, null, {headers: {'x-access-token': token}});
  }

  deleteUserMunicipal(userId: number, munId: number): Promise<void> {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token).jwt;
    }
    return axios.delete('/secure/user/' + userId + '/mun/' + munId, {
      headers: {
        'x-access-token': token
      }
    });
  }

  // addUserMunicipal(userId: number, munId: number): Promise<void> {
  //   let token = localStorage.getItem('token');
  //   if (token) token = JSON.parse(token).jwt;
  //   console.log('pener');
  //   return axios({
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
  //   return axios.post('/secure/user/' + userId + '/mun/' + munId, {
  //     headers: { 'x-access-token': token }
  //   });
  // }
}

export let userMunicipalService = new UserMunicipalService();