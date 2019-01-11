// @flow

import { Event, User, County, Municipal, Status, Issue_category, Issue, Feedback, Event_category } from './models.js';

import * as passwordHash from './passwordHash.js';
import express from 'express';
import path from 'path';
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app = express();
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

//User
app.get('/users', (req: Request, res: Response) => {
  return User.findAll().then(users => res.send(users));
});

app.get('/users/:id', (req: Request, res: Response) => {
  return User.findOne({ where: { user_id: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

app.post('/users', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  var passwordSalt = passwordHash.genRandomString(16);
  var passwordData = passwordHash.sha512(req.body.password, passwordSalt);

  return User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    rank: req.body.rank,
    salt: passwordData.salt,
    hash_str: passwordData.passwordHash
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/users/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

    return User.update({
            email: req.body.email,
            password: req.body.password,
            salt: req.body.salt,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rank: req.body.rank},
        {where: { user_id: req.params.id }}
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/users/:id', (req: Request, res: Response) => {
  return User.destroy({
    where: { user_id: req.params.id }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Municipal
app.get('/municipals', (req: Request, res: Response) => {
  return Municipal.findAll().then(users => res.send(users));
});

app.get('/municipals/:id', (req: Request, res: Response) => {
  return Municipal.findOne({ where: { mun_id: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

//County
app.get('/county', (req: Request, res: Response) => {
  return County.findAll().then(users => res.send(users));
});

app.get('/county/:id', (req: Request, res: Response) => {
  return County.findOne({ where: { county_id: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

//Issue
app.get('/users/:id/issue', (req: Request, res: Response) => {
  return Issue.findAll({ where: { user_id: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});

//Event
app.get('/events', (req: Request, res: Response) => {
  return Event.findAll().then(events => res.send(events));
});
app.get('/events/:id', (req: Request, res: Response) => {
  return Event.findOne({ where: { event_id: Number(req.params.id) } }).then(event =>
    event ? res.send(event) : res.sendStatus(404)
  );
});
app.put('/events/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Event.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      time_start: req.body.timeStart,
      time_end: req.body.timeEnd
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
  return Event.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    time_start: req.body.timeStart,
    time_end: req.body.timeEnd
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/events/:id', (req: Request, res: Response) => {
  return Event.destroy({
    where: {
      event_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Event_category
app.get('/eventCat', (req: Request, res: Response) => {
  return Event_category.findAll().then(eventCategories => res.send(eventCategories));
});

app.get('/eventCat/:id', (req: Request, res: Response) => {
  return Event_category.findOne({ where: { event_id: Number(req.params.id) } }).then(eventCategory =>
    eventCategory ? res.send(eventCategory) : res.sendStatus(404)
  );
});

app.put('/eventCat/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Event_category.update(
    {
      name: req.body.name
    },
    {
      where: {
        event_id: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/eventCat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Event_category.create({
    name: req.body.name
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/eventCat/:id', (req: Request, res: Response) => {
  return Event_category.destroy({
    where: {
      event_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Issue
app.get('/issues', (req: Request, res: Response) => {
  return Issue.findAll().then(issues => res.send(issues));
});
app.get('/issues/:id', (req: Request, res: Response) => {
  return Issue.findOne({ where: { issue_id: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});
app.put('/issues/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      status: req.body.status,
      date: req.body.date
    },
    {
      where: {
        issue_id: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/issues', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    status: req.body.status,
    date: req.body.date
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/issues/:id', (req: Request, res: Response) => {
  return Issue.destroy({
    where: {
      issue_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
//Issue_category
app.get('/issueCat', (req: Request, res: Response) => {
  return Issue_category.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/issueCat/:id', (req: Request, res: Response) => {
  return Issue_category.findOne({ where: { category_id: Number(req.params.id) } }).then(issueCategory =>
    issueCategory ? res.send(issueCategory) : res.sendStatus(404)
  );
});
app.put('/issueCat/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue_category.update(
    {
      name: req.body.name
    },
    {
      where: {
        category_id: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/issueCat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue_category.create({
    name: req.body.name
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/issueCat/:id', (req: Request, res: Response) => {
  return Issue_category.destroy({
    where: {
      category_id: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

module.exports = app;
