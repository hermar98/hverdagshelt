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
import {tokenManager} from './tokenManager.js';


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

app.get('/token', (req: Request, res: Response) => {
    let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
    if (tokenData) {
      let token = tokenManager.signToken(tokenData.userId, tokenData.rank);
      res.json({jwt: token});
    } else {
      res.sendStatus(401);
    }
});

app.post('/login', (req: Request, res: Response) => {
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { email, password } = body;

  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      let passwordData = passwordHash.sha512(password, user.salt);
      if (passwordData.passwordHash === user.hashStr) {
        let token = tokenManager.signToken(user.userId, user.rank);
        res.json({ jwt: token });
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

  if(!firstNameS){
    firstNameS = "";
  }
  if(!lastNameS){
    lastNameS = "";
  }

  User.findOne({ where: { email: email } }).then(user => {
    if (user) return res.sendStatus(409);
  });

  let passwordSalt = null;
  let passwordData = {
    passwordHash: null
  }

  if(password) {
    passwordSalt = passwordHash.genRandomString(16);
    passwordData = passwordHash.sha512(password, passwordSalt);
  }

  const token = crypto.randomBytes(20).toString('hex');

  let userRank = 0;
  let tokenData = tokenManager.verifyToken(req.headers['x-access-token']);
  if (tokenData) {
    if (tokenData.rank === 4) {
      userRank = rank;
    }
  }

  return User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    rank: userRank,
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
        "til Hverdagshelt. For å aktivere din bruker vennligst trykk følgende link:\nhttp://localhost:3000/#/aktiver/" + token +
      "\n\nHvis du ikke har registrert bruker hos oss, vennligst se bort fra denne mailen.\n\nMed vennlig hilsen\n" + "Hverdagshelt AS (Young Fleinar Inc.)");
    }
  });
});

app.put('/activate/:token', (req: Request, res: Response) => {
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { firstName, lastName, munId, rank, password } = body;
  let isAdminCreated = false;
  if(firstName && lastName && password){
    isAdminCreated = true;
  }

  let token = req.params.token;
  User.findOne({ where: { activateAccountToken: token } }).then(user => {
    if (user) {
      token = tokenManager.signToken(user.userId, user.rank);
      if(user.rank === 0){
        user.rank = 1;
      }else if(user.rank === 3){
        user.munId = munId;
      }

      if(isAdminCreated){
        user.firstName = firstName;
        user.lastName = lastName;
        user.passwordSalt = passwordHash.genRandomString(16);
        let passwordData = passwordHash.sha512(password, user.passwordSalt);
        user.passwordHash = passwordData.passwordHash;
      }

      return User.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          salt: user.passwordSalt,
          hashStr: user.passwordHash,
          rank: user.rank,
          munId: user.munId,
          activateAccountToken: null
        },
        { where: { userId: user.userId } }
      ).then(count => (count ? res.json({ jwt: token }) : res.sendStatus(404)));
    }else{
      res.sendStatus(404);
    }
  });
});

app.get('/activate/:token',(req: Request, res: Response) => {
  return User.findOne({ where: {activateAccountToken: req.params.token} }).then(user => res.send(user))
});

module.exports = app;
