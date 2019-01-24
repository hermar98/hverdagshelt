import service from './Service';

class Location {
  adress: string;
  lat: number;
  lng: number;
  country: string;
  county: string;
  municipality: string;
}

class MapService {
  getLoactionByAdress(adress: string): Promise<Location> {
    return service.post('/api/map', { adress: adress });
  }

  getLoactionByLatLng(lat: number, lng: number): Promise<Location> {
    return service.get('/api/map/' + lat + '/' + lng);
  }
}
export let mapService = new MapService();
