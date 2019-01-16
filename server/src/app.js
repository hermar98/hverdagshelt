// @flow

import {
  Event,
  User,
  County,
  Municipal,
  // Status,
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

//Flow type checking
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
  console.log(token);
  jwt.verify(token, secretKey, err => {
    if (err) {
      res.sendStatus(401);
    } else {
      next();
    }
  });
});

app.post('/login', (req: Request, res: Response) => {
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { email, password } = body;

  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      let passwordData = passwordHash.sha512(password, user.salt);
      if (passwordData.passwordHash === user.hashStr) {
        let token = jwt.sign({ email: email }, secretKey, {
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
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { password } = body;

  let token = req.params.id;
  console.log(password);
  User.findOne({ where: { resetPasswordToken: token } }).then(user => {
    if (user) {
      console.log(user.userId);
      let passwordSalt = passwordHash.genRandomString(16);
      let passwordData = passwordHash.sha512(password, passwordSalt);
      let token = jwt.sign({ email: user.email }, secretKey, { expiresIn: 4000 });
      return User.update(
        {
          salt: passwordSalt,
          hashStr: passwordData.passwordHash
        },
        { where: { userId: user.userId } }
      ).then(count => (count ? res.json({ userId: user.userId, jwt: token }) : res.sendStatus(404)));
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
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, email, rank, password } = body;

  User.findOne({ where: { email: email } }).then(user => {
    if (user) return res.sendStatus(409);
  });

  let passwordSalt = passwordHash.genRandomString(16);
  let passwordData = passwordHash.sha512(password, passwordSalt);

  return User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    rank: rank,
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
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, email, rank, salt, hashStr } = body;

  return User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    rank: rank,
    salt: salt,
    hashStr: hashStr
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.put('/secure/users/:id', (req: Request, res: Response) => {
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, email, rank, munId, password, salt, hashStr } = body;

  // if (!req.body || !(typeof req.body.email === 'string')) return res.sendStatus(400);

  if (password) {
    let passwordSalt = passwordHash.genRandomString(16);
    let passwordData = passwordHash.sha512(password, passwordSalt);

    return User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        rank: rank,
        munId: munId,
        salt: passwordSalt,
        hashStr: passwordData.passwordHash
      },
      { where: { userId: req.params.id } }
    ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
  }

  return User.update(
    {
      firstName: firstName,
      lastName: lastName,
      email: email,
      rank: rank,
      munId: munId,
      salt: salt,
      hashStr: hashStr
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
  return Issue.findAll({ where: { munId: Number(req.params.id) } }).then(issues =>
    issues ? res.send(issues) : res.sendStatus(404)
  );
});

app.get('/municipals/:id/events', (req: Request, res: Response) => {
  return Event.findAll({ where: { munId: Number(req.params.id) } }).then(events =>
    events ? res.send(events) : res.sendStatus(404)
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
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { title, content, image, longitude, latitude, timeStart, timeEnd } = body;

  return Event.update(
    {
      title: title,
      content: content,
      image: image,
      longitude: longitude,
      latitude: latitude,
      timeStart: timeStart,
      timeEnd: timeEnd
    },
    {
      where: {
        eventId: req.params.id
      }
    }
  ).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});
app.post('/secure/events', (req: Request, res: Response) => {
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { title, content, image, longitude, latitude, timeStart, timeEnd, categoryId, munId, userId } = body;

  return Event.create({
    title: title,
    content: content,
    image: image,
    longitude: longitude,
    latitude: latitude,
    timeStart: timeStart,
    timeEnd: timeEnd,
    categoryId: categoryId,
    munId: munId,
    userId: userId
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
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { name } = body;

  return EventCategory.create({
    name: name
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
      statusId: req.body.statusId,
      date: req.body.date,
      munId: req.body.munId
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
    categoryId: req.body.categoryId,
    munId: req.body.munId,
    userId: req.body.userId
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
  return Municipal.findAll({
    include: [
      {
        model: User,
        as: 'Users',
        attributes: [],
        where: { userId: Number(req.params.id) }
      }
    ]
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/user/:userId/mun/:munId', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
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
  return Issue.findAll({
    include: [
      {
        model: User,
        as: 'Users',
        attributes: [],
        where: { userId: Number(req.params.id) }
        // through: { model: UserIssue, as: 'UserIssues' }
      }
    ]
  }).then(user => (user ? res.send(user) : res.sendStatus(404)));
});

app.post('/secure/user/:userId/issue/:issueId', (req: Request, res: Response) => {
  return UserIssue.create({
    userId: req.params.userId,
    issueId: req.params.issueId
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.delete('/secure/user/:userId/issue/:issueId', (req: Request, res: Response) => {
  return UserIssue.destroy({ where: { userId: req.params.userId, issueId: req.params.issueId } }).then(count =>
    count ? res.sendStatus(200) : res.sendStatus(404)
  );
});

module.exports = app;
