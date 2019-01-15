// @flow

import {
  Event,
  User,
  County,
  Municipal,
  Status,
  IssueCategory,
  Issue,
  Feedback,
  EventCategory,
  UserMunicipal,
  UserIssue
} from './models.js';

import * as passwordHash from './passwordHash.js';
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

type Application = express$Application;
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

let app: Application = express();
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

let secretKey = fs.readFileSync('./secret.key', 'utf8');

app.use('/secure', (req: Request, res: Response, next) => {
  let token = req.headers['x-access-token'];
  jwt.verify(token, secretKey, err => {
    if (err) {
      res.sendStatus(401);
    } else {
      next();
    }
  });
});

app.post('/login', (req: Request, res: Response) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {
    //TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
    if (user) {
      let passwordData = passwordHash.sha512(req.body.password, user.salt); //TODO: Flow check: Cannot get `req.body.password` because property `password` is missing in mixed [1].
      if (passwordData.passwordHash === user.hashStr) {
        let token = jwt.sign({ email: req.body.email }, secretKey, {
          // TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
          expiresIn: 4000
        });
        res.json({ userId: user.userId, jwt: token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
});

app.put('/reset/:id', (req: Request, res: Response) => {
  let token = req.params.id;
  console.log(token);
  User.findOne({ where: { resetPasswordToken: token } }).then(user => {
    if (user) {
      console.log(user.userId);
      let passwordSalt = passwordHash.genRandomString(16);
      let passwordData = passwordHash.sha512(req.body.password, passwordSalt);
      console.log('Password' + req.body.password);
      return User.update(
        {
          salt: passwordSalt,
          hash_str: passwordData.passwordHash
        },
        { where: { userId: user.userId } }
      ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
    }
  });
});

app.get('/token', (req: Request, res: Response) => {
  let token = req.headers['x-access-token'];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      token = jwt.sign({ email: decoded.email }, secretKey, {
        expiresIn: 30
      });
      res.json({ jwt: token });
    }
  });
});

app.post('/register', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  let passwordSalt = passwordHash.genRandomString(16);
  let passwordData = passwordHash.sha512(req.body.password, passwordSalt); //TODO:  Flow check: Cannot get `req.body.password` because property `password` is missing in mixed [1].

  return User.create({
    firstName: req.body.firstName, // TODO: Flow check: Cannot get `req.body.firstName` because property `firstName` is missing in mixed [1].
    lastName: req.body.lastName, //TODO: Flow check: Cannot get `req.body.lastName` because property `lastName` is missing in mixed [1].
    email: req.body.email, //TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
    rank: req.body.rank, //TODO: Flow check: Cannot get `req.body.rank` because property `rank` is missing in mixed [1].
    salt: passwordSalt,
    hashStr: passwordData.passwordHash
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//User
app.get('/secure/users', (req: Request, res: Response) => {
  return User.findAll().then(users => res.send(users));
});

app.get('/secure/users/:id', (req: Request, res: Response) => {
  return User.findOne({ where: { userId: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

app.post('/secure/users', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  return User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    rank: req.body.rank,
    salt: req.body.salt,
    hashStr: req.body.hashStr
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/secure/users/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  if (req.body.password) {
    let passwordSalt = passwordHash.genRandomString(16);
    let passwordData = passwordHash.sha512(req.body.password, passwordSalt); //TODO: Flow check: Cannot get `req.body.password` because property `password` is missing in mixed [1].

    return User.update(
      {
        firstName: req.body.firstName, //TODO: Flow check: Cannot get `req.body.firstName` because property `firstName` is missing in mixed [1].
        lastName: req.body.lastName, //TODO: Flow check: Cannot get `req.body.lastName` because property `lastName` is missing in mixed [1].
        email: req.body.email, //TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
        rank: req.body.rank, //TODO: Flow check: Cannot get `req.body.rank` because property `rank` is missing in mixed [1].
        munId: req.body.munId, //TODO: Flow check: Cannot get `req.body.munId` because property `munId` is missing in mixed [1].
        salt: passwordSalt,
        hashStr: passwordData.passwordHash
      },
      { where: { userId: req.params.id } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  }

  return User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      rank: req.body.rank,
      munId: req.body.munId,
      salt: req.body.salt,
      hash_str: req.body.hash_str
    },
    { where: { userId: req.params.id } }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/users/:id', (req: Request, res: Response) => {
  return User.destroy({
    where: { userId: req.params.id }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Municipal
app.get('/municipals', (req: Request, res: Response) => {
  return Municipal.findAll().then(muns => res.send(muns));
});

app.get('/municipals/:id', (req: Request, res: Response) => {
  return Municipal.findOne({ where: { munId: Number(req.params.id) } }).then(mun =>
    mun ? res.send(mun) : res.sendStatus(404)
  );
});

app.get('/municipals/:id/issues', (req: Request, res: Response) => {
  return Municipal.findAll({ where: { munId: Number(req.params.id) } }).then(muns =>
    muns ? res.send(muns) : res.sendStatus(404)
  );
});

//County
app.get('/secure/county', (req: Request, res: Response) => {
  return County.findAll().then(users => res.send(users));
});

app.get('/secure/county/:id', (req: Request, res: Response) => {
  return County.findOne({ where: { countyId: Number(req.params.id) } }).then(user =>
    user ? res.send(user) : res.sendStatus(404)
  );
});

//Event
app.get('/secure/events', (req: Request, res: Response) => {
  return Event.findAll().then(events => res.send(events));
});
app.get('/secure/events/:id', (req: Request, res: Response) => {
  return Event.findOne({ where: { eventId: Number(req.params.id) } }).then(event =>
    event ? res.send(event) : res.sendStatus(404)
  );
});
app.put('/secure/events/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Event.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd
    },
    {
      where: {
        eventId: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/events', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Event.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    categoryId: req.body.categoryId
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/events/:id', (req: Request, res: Response) => {
  return Event.destroy({
    where: {
      eventId: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//EventCategory
app.get('/secure/eventCat', (req: Request, res: Response) => {
  return EventCategory.findAll().then(eventCategories => res.send(eventCategories));
});

app.get('/secure/eventCat/:id', (req: Request, res: Response) => {
  return EventCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(eventCategory =>
    eventCategory ? res.send(eventCategory) : res.sendStatus(404)
  );
});

app.put('/secure/eventCat/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return EventCategory.update(
    {
      name: req.body.name
    },
    {
      where: {
        categoryId: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/eventCat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return EventCategory.create({
    name: req.body.name
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/eventCat/:id', (req: Request, res: Response) => {
  return EventCategory.destroy({
    where: {
      categoryId: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

//Issue

app.get('/secure/issues', (req: Request, res: Response) => {
  return Issue.findAll().then(issues => res.send(issues));
});
app.get('/secure/issues/:id', (req: Request, res: Response) => {
  return Issue.findOne({ where: { issueId: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});
app.get('/secure/issues/:id/feedback', (req: Request, res: Response) => {
  return Feedback.findAll({ where: { issueId: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});
app.get('/secure/users/:id/issues', (req: Request, res: Response) => {
  return Issue.findAll({ where: { userId: Number(req.params.id) } }).then(issue =>
    issue ? res.send(issue) : res.sendStatus(404)
  );
});

app.put('/secure/issues/:id', (req: Request, res: Response) => {
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
        issueId: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/issues', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Issue.create({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    status: req.body.status,
    statusId: req.body.statusId,
    categoryId: req.body.categoryId
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/issues/:id', (req: Request, res: Response) => {
  return Issue.destroy({
    where: {
      issueId: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
//IssueCategory
app.get('/secure/issueCat', (req: Request, res: Response) => {
  return IssueCategory.findAll().then(issueCategories => res.send(issueCategories));
});
app.get('/secure/issueCat/:id', (req: Request, res: Response) => {
  return IssueCategory.findOne({ where: { categoryId: Number(req.params.id) } }).then(issueCategory =>
    issueCategory ? res.send(issueCategory) : res.sendStatus(404)
  );
});
app.put('/secure/issueCat/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return IssueCategory.update(
    {
      name: req.body.name
    },
    {
      where: {
        categoryId: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/issueCat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return IssueCategory.create({
    name: req.body.name
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.delete('/secure/issueCat/:id', function(req: Request, res: Response) {
  return IssueCategory.destroy({
    where: {
      categoryId: req.params.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.get('/secure/userMun/:id', (req: Request, res: Response) => {
  return User.findAll({
    include: [
      {
        model: Municipal,
        as: 'Municipals',
        attributes: ['munId', 'name']
      }
    ],
    attributes: [],
    where: { userId: Number(req.params.id) }
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/user/:userId/mun/:munId', (req: Request, res: Response) => {
  return UserMunicipal.create({
    userId: req.params.userId,
    munId: req.params.munId
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/user/:userId/mun/:munId', (req: Request, res: Response) => {
  return UserMunicipal.destroy({ where: { userId: req.params.userId, munId: req.params.munId } }).then(count =>
    count ? res.sendStatus(200) : res.sendStatus(404)
  );
});

app.get('/secure/userIssue/:id', (req: Request, res: Response) => {
  return User.findAll({
    include: [
      {
        model: Issue,
        as: 'Issues',
        attributes: ['issueId', 'name']
      }
    ],
    attributes: [],
    where: { userId: Number(req.params.id) }
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/user/:userId/issue/:issueId', (req: Request, res: Response) => {
  return UserIssue.create({
    userId: req.params.userId,
    munId: req.params.issueId
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/user/:userId/issue/:issueId', (req: Request, res: Response) => {
  return UserIssue.destroy({ where: { userId: req.params.userId, issueId: req.params.issueId } }).then(count =>
    count ? res.sendStatus(200) : res.sendStatus(404)
  );
});

module.exports = app;
