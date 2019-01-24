type Request = express$Request;
type Response = express$Response;

const app = require('../app');

//TODO: .env API Key
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCVd-3sSATNkNAa5jRe9U6_t8wR5YkH480',
  language: 'no'
});

//To translate adress to latlng ++
app.post('/api/map', (req: Request, res: Response) => {
  let result = null;
  if (!req.body.adress) {
    return res.sendStatus(404);
  }
  googleMapsClient.geocode(
    {
      address: req.body.adress
    },
    function(err, response) {
      if (!err) {
        // console.log(response.json.results);
        // result = response.json.results;
        result = {
          adress: response.json.results[0].formatted_address,
          lat: response.json.results[0].geometry.location.lat,
          lng: response.json.results[0].geometry.location.lng,
          country: response.json.results[0].address_components[5].long_name,
          county: response.json.results[0].address_components[4].long_name,
          municipality: response.json.results[0].address_components[3].long_name
        };
        console.log(result);
        return res.send(result);
      } else {
        console.log(err);
        res.sendStatus(404);
      }
    }
  );
});

//To translate latlng to adress ++
app.get('/api/map/:lat/:long', (req: Request, res: Response) => {
  let result = null;
  let r = { lat: req.params.lat, lng: req.params.long };
  googleMapsClient.reverseGeocode(
    {
      latlng: r
    },
    function(err, response) {
      if (!err) {
        // console.log(response.json.results);
        // result = response.json.results;
        result = {
          adress: response.json.results[0].formatted_address,
          lat: response.json.results[0].geometry.location.lat,
          lng: response.json.results[0].geometry.location.lng

          // country: response.json.results[0].address_components[4].long_name,
          // county: response.json.results[0].address_components[3].long_name,
          // municipality: response.json.results[0].address_components[2].long_name
        };
        // console.log(result);
        return res.send(result);
      } else {
        res.sendStatus(404);
      }
    }
  );
});
