//@flow
import { Municipal } from '../models/Municipal';
import service from './Service';

class MunicipalService {
  getMunicipals(): Promise<Municipal[]> {
    return service.get('/municipals');
  }

  getMunicipal(munId: number): Promise<Municipal> {
    return service.get('/municipals/' + munId);
  }
  getMunicipalId(name: string): Promise<Municipal> {
    let a = { name: name };
    return service.post('/municipalsId/', a);
  }

  getIssuesByMunicipals(munId: number): Promise<Municipal[]> {
    return service.get('/municipals/' + munId + '/issues');
  }
}

export let municipalService = new MunicipalService();
