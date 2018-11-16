import { Account } from './../models';
import config from "config";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { sendEmail } from "../api/email";

export default {

  async register(req, res) {
    try {
      let { login, password, email } = req.body;
      email = email.trim().toLowerCase();
      if (!login || !password) {
        return res.status(400).json({ message: 'Required params are missing' });
      }
      const saltRound = config.auth.saltRound;
      const salt = bcrypt.genSaltSync(saltRound);
      const code = _.random(0, 99999);
      await sendEmail(email, 'Wind-map activation code', code);
      let acc = {
        login,
        email,
        code,
        encrypted_password: bcrypt.hashSync(password, salt),
        created_at: new Date(),
        updated_at: new Date(),
      };

      Account.create(acc)
        .then(() => {
          return res.status(200).json({ message: 'OK' });
        })
        .catch(err => {
          return res.status(500).json({ error: err.message });
        });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async changePassword(req, res) {
    try {
      let { login, password, changePasswordCode } = req.body;
      console.log(req.body);
      if (!login || !password) {
        return res.status(400).json({ message: 'Required params are missing' });
      }

      const acc = await Account.findOne({ where: { login } });
      if (acc.changePasswordCode) {
        if (changePasswordCode) {
          if (acc.changePasswordCode != changePasswordCode) {
            acc.attemptsChangePasswordCode++;
            if (acc.attemptsChangePasswordCode > 2) {
              const changePasswordCode = _.random(0, 99999);
              await sendEmail(acc.email, 'Wind-map change password code', changePasswordCode);
              acc.changePasswordCode = changePasswordCode;
              acc.attemptsChangePasswordCode = 0;
              await acc.save();
              throw new Error('3 attempts are complete! A new code has been sent to your email.')
            }
            await acc.save();
            throw new Error('invalid code!');
          }
          acc.changePasswordCode = '';
          acc.attemptsChangePasswordCode = 0;
          const saltRound = config.auth.saltRound;
          const salt = bcrypt.genSaltSync(saltRound);
          acc.encrypted_password = bcrypt.hashSync(password, salt);
          await acc.save();
          return res.status(200).json({ message: 'OK' });
        }
        return res.status(200).json({ message: 'code', email: acc.email });
      } else {
        const changePasswordCode = _.random(0, 99999);
        await sendEmail(acc.email, 'Wind-map change password code', changePasswordCode);
        acc.changePasswordCode = changePasswordCode;
        await acc.save();
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { login, password, code } = req.body;
      if (!login || !password) {
        return res.status(400).json({ message: 'Required params are missing' });
      }
      const acc = await Account.findOne({ where: { login } });
      if (acc.code) {
        if (code) {
          if (acc.code != code) {
            acc.attemptsCode++;
            if (acc.attemptsCode > 2){
              const code = _.random(0, 99999);
              await sendEmail(acc.email, 'Wind-map activation code', code);
              acc.code = code;
              acc.attemptsCode = 0;
              await acc.save();
              throw new Error('3 attempts are complete! A new code has been sent to your email.')
            }
            await acc.save();
            throw new Error('invalid code!')
          }
          acc.code = '';
          acc.attemptsCode = 0;
          await acc.save()
        } else {
          return res.status(200).json({ message: 'code', email: acc.email });
        }
      }
      await acc.comparePassword(password);
      const token = acc.generateJWT();
      return res.status(200).json({ message: 'OK', token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
