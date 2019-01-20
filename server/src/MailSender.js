//@flow
const nodemailer = require('nodemailer');

class MailSender {

  sendEmail(emailRecipient: string, subject: string, message: string){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `HverdagsHeltAS@gmail.com`,
        pass: `hverdag123`
      }
    });

    const mailOptions = {
      from: `HverdagsheltAS@gmail.com`,
      to: `${emailRecipient}`,
      subject: `${subject}`,
      text: `${message}`
    }

    console.log('sender mail');
    transporter.sendMail(mailOptions, function (err, response) {
      if(err)
        console.log(err)
      else
        console.log(response);
    });
  }
}

export let mailSender = new MailSender();