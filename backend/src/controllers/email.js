import emailExistence from 'email-existence';
import { getCurrentLocation } from '../api/location';
import { Email } from './../models';

const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    return emailExistence.check(email, (error, response) => {
      if (error || (!response)) {
        return reject(new Error(`Email ${email} doesn't exist`))
      } else{
        return resolve(true)
      }
    })
  })
}

export default {

  async saveEmail(req, res) {
    try {
      let { code, email } = req.params;
      email = email.trim().toLowerCase();
      const promises = [
        getCurrentLocation(code),
        verifyEmail(email),
      ];
      return Promise.all(promises)
        .then(async () => {
          const obj = await Email.findOne({ where: { email } });
          if (obj) {
            await obj.update({ code, updated_at: new Date() });
          } else {
            await Email.create({ email, code, created_at: new Date(), updated_at: new Date() });
          }
          res.status(200).json({ status: 'OK' })
        })
        .catch(err => {
          console.log(1, err);
          return res.status(500).json({ error: err.message })
        })
    } catch (err) {
      console.log(2, err);
      return res.status(500).json({ error: err.message })
    }
  }
}
