// @flow
import path from 'path';
import reload from 'reload';
import fs from 'fs';

const public_path = path.join(__dirname, '/../../client/public');

const app = require('./app');

require('./routes/forgotPassword');
require('./routes/issues');
require('./routes/eventCategory');
require('./routes/county');
require('./routes/feedback');
require('./routes/image');
require('./routes/issueCategory');
require('./routes/municipal');
require('./routes/userIssue');
require('./routes/userMunicipal');
require('./routes/users');
require('./routes/events');
require('./routes/map');

// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyA1yYbq9zX4FeY6oCLLASJEkqjvL9Rakok'
// });

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, (err?: ?Error) => {
    if (err) reject(err.message);
    console.log('Server started');
    resolve();
  });
});
