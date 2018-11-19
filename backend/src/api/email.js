import nodemailer from 'nodemailer';
import emailExistence from 'email-existence';
import config from 'config';

const transporter = nodemailer.createTransport(config.nodemailerOptions);

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    return emailExistence.check(email, (error, response) => {
      if (error || (!response)) {
        return reject(new Error(`Email ${email} doesn't exist`));
      } else {
        return resolve(true);
      }
    });
  });
};

const sendEmail = (email, subject, text) => {
  text += '';
  subject += '';
  const mailOptions = {
    from: config.nodemailerOptions.auth.user,
    to: email,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(`error Email ${email}`);
    }
    return true;
  });
};

export {
  sendEmail,
  verifyEmail,
};
