// @flow

import { User } from '../src/models';
import express from 'express';
import path from 'path';
require('dotenv').config();

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const public_path = path.join(__dirname, '/../../client/public');

// type Application = express$Application;
type Request = express$Request;
type Response = express$Response;

const app = require('./app');

app.post('/forgotPassword', (req: Request, res: Response) => {
  if (!req.body || typeof req.body.email != 'string') return res.sendStatus(400);
  if (req.body instanceof Object) {
    //TODO: Flow check: Property `email` is missing in mixed [1].
    res.json('email er påkrevd');
  }
  console.log(req.body.email); //TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
  User.findOne({
    where: {
      email: req.body.email //TODO: Flow check: Cannot get `req.body.email` because property `email` is missing in mixed [1].
    }
  }).then(user => {
    if (user === null) {
      console.log('email not in database');
      res.json('email er ikke i databasen');
    } else {
      let t = new Date();
      t.setMinutes(t.getMinutes() + 15);

      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: t
      });

      /*let emailUser = process.env.EMAIL_ADDRESS;
                let passUser = process.env.EMAIL_PASSWORD;

                if (!emailUser) { throw new Error('Email Adress is not defined as local variable'); }
                if (!passUser) { throw new Error('Password is not defined as local variable'); }*/

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          //user: `${emailUser}`,
          //pass: `${passUser}`,
          user: `HverdagsHeltAS@gmail.com`,
          pass: `hverdag123`
        }
      });

      const mailOptions = {
        from: `HverdagsheltAS@gmail.com`,
        //Password: hverdag123
        to: `${user.email}`,
        subject: `Link for å resette passord`,
        text:
          `Du har fått denne emailen etter din (eller noen andres) forespørsel om resetting av passordet for din bruker.\n\n` +
          `Venligst klikk på denne linken, eller kopier og lim den in til din søker for å fullføre prossesen, helst innen en time etter du fikk den:\n\n` +
          `http://localhost:3031/reset/${token}\n\n` +
          `Hvis du ikke har forespurt denne passord endringen så bare ignorer denne emailen og din passord vil ikke endres:\n\n`
      };

      console.log('sender mail');

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.sendSratus(200).json('recovery email sent');
        }
      });
    }
  });
});

// module.exports = app;
