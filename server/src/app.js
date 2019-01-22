// @flow

import {
  User
} from './models.js';

import * as passwordHash from './passwordHash.js';
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import {mailSender} from "./MailSender";


//Flow type checking
type Application = express$Application;
type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');
const crypto = require('crypto');

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


app.post('/register', (req: Request, res: Response) => {
  // if (!(req.body instanceof Object)) return res.sendStatus(400);
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, email, rank, password } = body;
  let emailS: string = (email: any);
  let firstNameS: string = (firstName: any);
  let lastNameS: string = (lastName: any);

  User.findOne({ where: { email: email } }).then(user => {
    if (user) return res.sendStatus(409);
  });

  let passwordSalt = passwordHash.genRandomString(16);
  let passwordData = passwordHash.sha512(password, passwordSalt);

  const token = crypto.randomBytes(20).toString('hex');

  return User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    rank: rank,
    salt: passwordSalt,
    hashStr: passwordData.passwordHash,
    activateAccountToken: token
  }).then(count => {
    if(!count){
      console.log("Something went wrong")
      res.sendStatus(404);
    }else{
      console.log("Nothing wrong here, please continue");

      res.sendStatus(200);
      mailSender.sendEmail(emailS, "Aktivering av bruker", "Hei " + firstNameS + " " + lastNameS + "!\n\nTakk for din registrering og velkommen " +
        "til Hverdagshelt. For å aktivere din bruker vennligst trykk følgende link:\nhttp://localhost:3000/#/activate/" + token +
      "\n\nHvis du ikke har registrert bruker hos oss, vennligst se bort fra denne mailen.\n\nMed vennlig hilsen\n" + "Hverdagshelt AS (Young Fleinar Inc.)");
    }
  });
});

app.put('/activate/:token', (req: Request, res: Response) => {
  let token = req.params.token;
  User.findOne({ where: { activateAccountToken: token } }).then(user => {
    if (user) {
      token = jwt.sign({ email: user.email }, secretKey, { expiresIn: 4000 });
      return User.update(
        {
          rank: 1
        },
        { where: { userId: user.userId } }
      ).then(count => (count ? res.json({ userId: user.userId, jwt: token }) : res.sendStatus(404)));
    }
  });
});

module.exports = app;
