// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {
  Students,
  Event,
  User,
  User_case,
  County,
  Municipal,
  Status,
  Issue_category,
  Issue,
  Feedback,
  Event_category
} from './models.js';

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA1yYbq9zX4FeY6oCLLASJEkqjvL9Rakok'
});

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

app.get('/users', (req: Request, res: response) => {
  return Users.findAll().then(users => res.send(users));
});

app.get('/users/:id', (req: Request, res: Response) => {
    return Users.findOne({ where: { id: Number(req.params.id) } }).then(users =>
        user ? res.send(user) : res.sendStatus(404)
    );
});

app.post('/users', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    return Users.create({
        email: req.body.email,
        password: req.body.password,
        salt: req.body.salt,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        rank: req.body.rank
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/users/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    return Users.update({
            email: req.body.email,
            password: req.body.password,
            salt: req.body.salt,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rank: req.body.rank},
        {where: { id: req.params.id }}
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/users/:id', (req: Request, res: Response) => {
    return Users.destroy({
        where: {id: req.params.id}
    }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)))
});

app.get('/students', (req: Request, res: Response) => {
  return Students.findAll().then(students => res.send(students));
});

app.get('/students/:id', (req: Request, res: Response) => {
  return Students.findOne({ where: { id: Number(req.params.id) } }).then(student =>
    student ? res.send(student) : res.sendStatus(404)
  );
});

app.get('/users/:id', (req: Request, res: Response) => {
  return User.findAll({ where: { user_id: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

app.get('/users/:id/issue', (req: Request, res: Response) => {
  return Issue.findAll({ where: { user_id: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});

app.put('/students', (req: Request, res: Response) => {
  if (
    !req.body ||
    typeof req.body.id != 'number' ||
    typeof req.body.firstName != 'string' ||
    typeof req.body.lastName != 'string' ||
    typeof req.body.email != 'string'
  )
    return res.sendStatus(400);

  return Students.update(
    { firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email },
    { where: { id: req.body.id } }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Events
app.get('/events', (req: Request, res: Response) => {
  return Events.findAll().then(events => res.send(events));
});
app.get('/events/:id', (req: Request, res: Response) => {
  return Events.findOne({ where: { event_id: Number(req.params.id) } }).then(event =>
    event ? res.send(event) : res.sendStatus(404)
  );
});

app.put('/events/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Events.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      time_start: req.body.time_start,
      time_end: req.body.time_end
    },
    {
      where: {
        event_id: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.post('/events', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Events.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    time_start: req.body.time_start,
    time_end: req.body.time_end
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/events/:id', function(req, res) {
  return Event.destroy({
    where: {
      event_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.post('/issues', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    date: sequelize.literal('CURRENT_TIMESTAMP')
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/issues/:id', function(req, res) {
  return Issue.destroy({
    where: {
      case_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
