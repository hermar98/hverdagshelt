// @flow
import { User } from '../src/models';
require('dotenv').config();

const crypto = require('crypto');
const nodemailer = require('nodemailer');

//Flow type checking
type Request = express$Request;
type Response = express$Response;

const app = require('./app');

app.post('/forgotPassword', (req: Request, res: Response) => {
  //Flow type checking mixed src: https://github.com/flow-typed/flow-typed/issues/812
  const body = req.body !== null && typeof req.body === 'object' ? req.body : {};
  const { email } = body;
  // if (!req.body || !(typeof req.body.email === 'string')) return res.sendStatus(400);
  if (!email) {
    res.json('email er påkrevd');
  }

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (user === null) {
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
          `http://localhost:3000/#/reset/${token}\n\n` +
          `Hvis du ikke har forespurt denne passord endringen så bare ignorer denne emailen og din passord vil ikke endres:\n\n`
      };

      console.log('sender mail');

      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.sendStatus(200).json('recovery email sent');
        }
      });
    }
  });
});

// module.exports = app;
