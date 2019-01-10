import User from '../sequelize';
import crypto from 'crypto';
require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = app => {
    app.post('/forgotPassword', (req, res, next) => {
        if (req.body.email === '') {
            res.json('email er påkrevd');
        }
        console.log(req.body.email);
        User.findOne({
            where: {
                email: req.body.email,
            },
        }).then(user => {
            if (user === null) {
                console.log('email not in database');
                res.json('email er ikke i databasen');
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                user.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 90000,
                });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.EMAIL_ADDRESS}`,
                        pass: `${process.env.EMAIL_PASSWORD}`,
                    },
                });

                const mailOptions = {
                    from: `HverdagsheltAS@gmail.com`,
                    //Password: hverdag123
                    to: `${user.email}`,
                    subject: `Link for å resette passord`,
                    text:
                        `Du har fått denne emailen etter din (eller noen andres) forespørsel om resetting av passordet for din bruker.\n\n`+
                        `Venligst klikk på denne linken, eller kopier og lim den in til din søker for å fullføre prossesen, helst innen en time etter du fikk den:\n\n` +
                        `http://localhost:3031/reset/${token}\n\n` +
                        `Hvis du ikke har forespurt denne passord endringen så bare ignorer denne emailen og din passord vil ikke endres:\n\n`,
                };

                console.log('sender mail');

                transporter.sendMail(mailOptions, function(err, response) {
                    if (err) {
                        console.error('there was an error: ', err);
                    } else {
                        console.log('here is the res: ', response);
                        res.status(200).json('recovery email sent');
                    }
                });
            }
        });
    });
};