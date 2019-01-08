// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import { Students } from './models.js';

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
