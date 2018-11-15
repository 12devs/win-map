const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const config = require('config');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: config.nodemailerAuth
});

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    return emailExistence.check(email, (error, response) => {
      if (error || (!response)) {
        return reject(new Error(`Email ${email} doesn't exist`))
      } else {
        return resolve(true)
      }
    })
  })
};

const sendEmail = (email, subject, text) => {
  text += '';
  subject += '';
  return verifyEmail(email)
    .then(() => {
      const mailOptions = {
        from: config.nodemailerAuth.user,
        to: email,
        subject,
        text
      };
      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          throw new Error(`error Email ${email}`);
        }
        return true;
      });
    })
};

export {
  sendEmail
}
