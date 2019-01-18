//@flow
import {Municipal} from "../models";
import axios from "axios";
axios.interceptors.response.use(response => response.data);

class MunicipalService {
  getMunicipals(): Promise<Municipal[]> {
    return axios.get('/municipals');
  }

  getMunicipal(munId: number): Promise<Municipal> {
    return axios.get('/municipals/' + munId);
  }

  getIssuesByMunicipals(munId: number): Promise<Municipal[]> {
    return axios.get('/municipals/' + munId + '/issues');
  }
}

export let municipalService = new MunicipalService();