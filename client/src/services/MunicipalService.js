//@flow
import {Municipal} from "../models/Municipal";
import service from "./Service";

class MunicipalService {
  getMunicipals(): Promise<Municipal[]> {
    return service.get('/municipals');
  }

  getMunicipal(munId: number): Promise<Municipal> {
    return service.get('/municipals/' + munId);
  }

  getIssuesByMunicipals(munId: number): Promise<Municipal[]> {
    return service.get('/municipals/' + munId + '/issues');
  }
}

export let municipalService = new MunicipalService();